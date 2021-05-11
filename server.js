const path = require("path");

const dotenv = require("dotenv");

const fetch = require("node-fetch");

var { nanoid } = require("nanoid");
const http = require("http");
const host = "0.0.0.0";
const PORT = process.env.PORT || 3000;
const express = require("express");
const room_problems = new Map();
const res_time = new Map();

const socketio = require("socket.io");

const formatMessage = require("./utils/messages");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  make_ready,
  allready,
  giveProblems,
  getTeamUsers,
  userTeamJoin,
  getUserState
} = require("./utils/users");
const { schedulingPolicy } = require("cluster");

const app = express();

const server = http.createServer(app);

const io = socketio(server);

//django unchained

app.use(express.static(path.join(__dirname, "publicis")));
io.on("connection", (socket) => {
  //console.log("new ws connection");

  socket.on("disconnect", () => {
    const userr=getUserState(socket.id);
    if(userr!=undefined) {
      if(userr.state!=1)
      {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit(
            "message",
            formatMessage("BOSS", `${user.username} has left the chat`)
          );
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
      }
    }
    else{
      const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit(
            "message",
            formatMessage("BOSS", `${user.username} has left the chat`)
          );
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
          });
        }
    }
    // socket.socket.connect();
  });

  socket.on("ready", ({ username, room }) => {
    const user = make_ready(socket.id, username, room, 1);
    io.to(user.room).emit(
      "message",
      formatMessage("BOSS", `${user.username} is ready now`)
    );
    const users = getRoomUsers(room);
    if (allready(room)) {
      const problems = [];
      // giveProblems();
      io.to(user.room).emit("start_loader", problems);
      async function getFinal() {
        let contests_given = new Set();
        let solved = new Set();
        let user_contests = "https://codeforces.com/api/user.rating?handle=";
        const url_info = " https://codeforces.com/api/user.info?handles=";
        for (let i = 0; i < users.length; i++) {
          let handle_name1 = users[i].username;
          // async function getSetGo() {
          let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name1}`;
          const jsondata = await fetch(modified_url);
          const jsdata = await jsondata.json();
          for (let i = 0; i < jsdata.result.length; i++) {
            if (jsdata.result[i].verdict == "OK") {
              let str =
                jsdata.result[i].problem.contestId +
                "-" +
                jsdata.result[i].problem.index;
              solved.add(str);
            }
          }
          let modified_url2 = user_contests + handle_name1;
          const jsondata1 = await fetch(modified_url2);
          const jsdata2 = await jsondata1.json();
          for (let i = 0; i < jsdata2.result.length; i++) {
            contests_given.add(jsdata2.result[i].contestId);
          }
        }

        let modified_url2 = `https://codeforces.com/api/problemset.problems`;
        const jsondata4 = await fetch(modified_url2);
        jsdata4 = await jsondata4.json();
        let jsdataP = jsdata4;
        let upsolved = [];
        function shuffle(array) {
          var currentIndex = array.length,
            temporaryValue,
            randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        }
        for (let i = 0; i < jsdataP.result.problems.length; i++) {
          if (
            contests_given.has(jsdataP.result.problems[i].contestId) &&
            solved.has(
              `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`
            ) == false
          ) {
            let rating =
              jsdataP.result.problems[i].rating != undefined
                ? jsdataP.result.problems[i].rating
                : 9999999999;
            upsolved.push([
              rating,
              `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`,
            ]);
          }
        }
        upsolved.sort();
        let j = 0;
        shuffle(jsdata4.result.problems);
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (upsolved[j][0] <= 1200) {
            problems.push(upsolved[j]);
            j++;
            break;
          }
          if (
            jsdata4.result.problems[i].rating > 900 &&
            jsdata4.result.problems[i].rating <= 1200 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 900 &&
            jsdata4.result.problems[i].tags.includes("*special") === false
          ) {
            //to be continued

            problems.push([jsdata4.result.problems[i].rating, str]);
            break;
          }
        }
        for (j; j < upsolved.length; j++) {
          if (upsolved[j][0] > 1200) {
            break;
          }
        }
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (upsolved[j][0] <= 1500) {
            problems.push(upsolved[j]);
            j++;
            break;
          }
          if (
            jsdata4.result.problems[i].rating > 1200 &&
            jsdata4.result.problems[i].rating <= 1500 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 900 &&
            jsdata4.result.problems[i].tags.includes("*special") === false
          ) {
            //to be continued
            problems.push([jsdata4.result.problems[i].rating, str]);
            break;
          }
        }

        for (j; j < upsolved.length; j++) {
          if (upsolved[j][0] > 1500) {
            break;
          }
        }
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (upsolved[j][0] <= 1700) {
            problems.push(upsolved[j]);
            j++;
            break;
          }
          if (
            jsdata4.result.problems[i].rating > 1500 &&
            jsdata4.result.problems[i].rating <= 1700 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 200 &&
            jsdata4.result.problems[i].tags.includes("*special") === false
          ) {
            //to be continued
            problems.push([jsdata4.result.problems[i].rating, str]);
            // problems.push(str);
            break;
          }
        }
        for (j; j < upsolved.length; j++) {
          if (upsolved[j][0] > 1700) {
            break;
          }
        }
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (upsolved[j][0] <= 2100) {
            problems.push(upsolved[j]);
            j++;
            break;
          }
          if (
            jsdata4.result.problems[i].rating > 1700 &&
            jsdata4.result.problems[i].rating <= 2100 &&
            solved.has(str) === false &&
            jsdata4.result.problems[i].tags.includes("*special") === false
          ) {
            problems.push([jsdata4.result.problems[i].rating, str]);
            //to be continued
            // problems.push(str);
            break;
          }
        }

        // problem_set=problems;
        room_problems.set(room, problems);
        console.log(problems);
        let time = new Date().getTime();
        res_time.set(room, time);
        console.log(time);
        io.to(user.room).emit("start_contest", problems, time);
      }
      getFinal();
    }
  });

  socket.on("checkId", (room) => {
    let users = getRoomUsers(room);
    if (users.length == 0) {
      io.to(socket.id).emit("roomIdChecked", 0);
    } else if (users != undefined) {
      if (users[0].teamName != undefined) {
        io.to(socket.id).emit("roomIdChecked", 2);
      } else {
        io.to(socket.id).emit("roomIdChecked", 1);
      }
    }
  });
  socket.on("checkTeamId", (team, room) => {
    let users = getRoomUsers(room);
    let fl = 1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].teamID == team) {
        fl = 0;
        io.to(socket.id).emit("teamIdChecked", 1, users[i].teamName);
        break;
      }
    }
    if (fl) {
      io.to(socket.id).emit("roomIdChecked", 0, null);
    }
  });
  socket.on("give_id", () => {
    let ID = nanoid(4);
    io.to(socket.id).emit("rec_id", ID);
  });

  socket.on("give_team_and_room_id", () => {
    let teamID = nanoid(5);
    let roomID = nanoid(6);
    io.to(socket.id).emit("rec_team_id", teamID, roomID);
  });

  socket.on("give_team_id", () => {
    let teamID = nanoid(5);
    io.to(socket.id).emit("rec_team_id_without_room", teamID);
  });
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage("BOSS", "Welcome to CodeBlast, ready to blast your code?")
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("BOSS", `${user.username} has joined the room`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    if (contestStarted(room)) {
      socket.emit("takeHimIn", room_problems.get(room), res_time.get(room));
    }
  });
  socket.on("joinRoomTeam", ({ username, room, teamID, teamName }) => {
    const user = userTeamJoin(socket.id, username, room, teamID, teamName);
    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage("BOSS", "Welcome to CodeBlast, ready to blast your code?")
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("BOSS", `${user.username} has joined the room`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    if (contestStarted(room)) {
      let time = new Date().getTime();
      socket.emit("takeHimIn", room_problems.get(room), time);
    }
  });
  function contestStarted(room) {
    if (room_problems.has(room)) {
      return true;
    } else {
      return false;
    }
  }
  socket.on("results", (room, problems) => {
    let users = getRoomUsers(room);
    let start_time = res_time.get(room);
    async function getFinal() {
      let re_map = new Map();

      for (let j = 0; j < users.length; j++) {
        let handle_name1 = users[j].username;
        // async function getSetGo() {
        let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name1}`;
        let arr = [];
        for (let i = 0; i < problems.length; i++) {
          arr.push({
            result: false,
            penalty: 0,
            time: "Not solved",
            qno: i,
            points: problems[i][0],
          });
        }
        const jsondata = await fetch(modified_url);
        const jsdata = await jsondata.json();
        for (let i = 0; i < jsdata.result.length; i++) {
          let str =
            jsdata.result[i].problem.contestId +
            "-" +
            jsdata.result[i].problem.index;
          for (let ll = 0; ll < problems.length; ll++) {
            if (problems[ll][1] == str) {
              let unix_timestamp = jsdata.result[i].creationTimeSeconds;
              var date = new Date(unix_timestamp * 1000);
              // Hours part from the timestamp
              var date1 = date.getDate();
              var month1 = date.getMonth();
              var hours = date.getHours();
              // Minutes part from the timestamp
              let actualDate = new Date();
              var minutes = "0" + date.getMinutes();
              var seconds = "0" + date.getSeconds();
              var formattedTime =
                hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
              var act_date = new Date();
              let act_month = act_date.getMonth();
              let act_dat = act_date.getDate();

              let res = {
                result: false,
                penalty: 0,
                time: "Not solved",
                qno: ll,
                points: jsdata.result[i].problem.rating,
              };
              for (let l = 0; l < arr.length; l++) {
                if (arr[l].qno == ll) {
                  res = arr[l];
                  break;
                }
              }
              
              if (jsdata.result[i].verdict === "OK"&&res.result==false) {
                res.time = formattedTime;
                res.result = true;
                res.points = jsdata.result[i].problem.rating;
                res.points = Math.floor(Math.max(
                  res.points -
                    (res.penalty * 50) -
                    Math.abs((date - start_time) / 60000) *
                      0.004 *
                      res.points,
                  res.points * 0.3
                ));
                for (let l = 0; l < arr.length; l++) {
                  if (arr[l].qno == ll&&arr[l].result==false) {
                    arr[l] = res;
                    console.log(arr);
                    console.log(res);
                    break;
                  }
                }
                
              } else {
                if (act_dat == date1 && act_month == month1) {
                  res.penalty++;
                }
              }
              // for (let l = 0; l < arr.length; l++) {
              //   if (arr[l].qno == ll) {
              //     arr[l] = res;
              //     break;
              //   }
              // }
              // console.log(arr);
            }
          }
        }
        function compare(a, b) {
          if (a.qno < b.qno) {
            return -1;
          }
          if (a.qno > b.qno) {
            return 1;
          }
          return 0;
        }

        // if (arr.length < problems.length) {
        //   for (let i = 0; i < problems.length; i++) {
        //     let fl = 0;
        //     for (let k = 0; k < arr.length; k++) {
        //       if (arr[k].qno == problems[i][1]) {
        //         fl = 1;
        //         break;
        //       }
        //     }
        //     if (!fl) {
        //       arr.push({
        //         result: false,
        //         penalty: 0,
        //         time: "Not solved",
        //         qno: i,
        //       });
        //     }
        //   }
        // }
        arr.sort(compare);
        re_map.set(users[j].username, arr);
      }

      function mapToObj(map) {
        const obj = {};
        for (let [k, v] of map) obj[k] = v;
        return obj;
      }
      let res = mapToObj(re_map);
      let map_s = JSON.stringify(res);
      socket.emit("go_results", map_s);

      // }
      // getSetGo();
    }
    getFinal();
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});
app.get("/screen/:id", (req, res) => {
  //meet screen
  let screen_name = req.params.id;
  console.log(screen_name);
  if (screen_name == "1") {
    res.sendFile(__dirname + "/publicis/after_login.html");
  }
});
//console.log(process.env.FIREBASE_API_KEY);
server.listen(PORT, host, function () {
  //console.log("Server started.......");
});
