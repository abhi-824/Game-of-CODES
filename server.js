const path = require("path");

const dotenv = require("dotenv");

const fetch = require("node-fetch");

var { nanoid } = require("nanoid");
const http = require("http");
const host = "0.0.0.0";
const PORT = process.env.PORT || 3000;
const express = require("express");
const room_problems = new Map();



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
        let solved = new Set();
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
        }

        let modified_url2 = `https://codeforces.com/api/problemset.problems`;
        const jsondata4 = await fetch(modified_url2);
        jsdata4 = await jsondata4.json();

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

        shuffle(jsdata4.result.problems);
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (
            jsdata4.result.problems[i].rating > 900 &&
            jsdata4.result.problems[i].rating <= 1200 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 900
            && jsdata4.result.problems[i].tags.includes("*special")===false
          ) {
            //to be continued

            problems.push(str);
            break;
          }
        }
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (
            jsdata4.result.problems[i].rating > 1200 &&
            jsdata4.result.problems[i].rating <= 1500 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 900
            && jsdata4.result.problems[i].tags.includes("*special")===false
          ) {
            //to be continued
            problems.push(str);
            break;
          }
        }

        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (
            jsdata4.result.problems[i].rating > 1500 &&
            jsdata4.result.problems[i].rating <= 1700 &&
            solved.has(str) === false &&
            jsdata4.result.problemStatistics[i].solvedCount >= 200
            && jsdata4.result.problems[i].tags.includes("*special")===false
            ) {
            //to be continued
            problems.push(str);
            break;
          }
        }
        for (let i = 0; i < jsdata4.result.problems.length; i++) {
          let str =
            jsdata4.result.problems[i].contestId +
            "-" +
            jsdata4.result.problems[i].index;
          if (
            jsdata4.result.problems[i].rating > 1700 &&
            jsdata4.result.problems[i].rating < 2100 &&
            solved.has(str) === false
            && jsdata4.result.problems[i].tags.includes("*special")===false
            ) {
            //to be continued
            problems.push(str);
            break;
          }
        }

        // problem_set=problems;
        room_problems.set(room, problems);
        io.to(user.room).emit("start_contest", problems);
      }
      getFinal();
    }
  });

  socket.on("checkId", (room) => {
    let users = getRoomUsers(room);
    if (users.length == 0) {
      io.to(socket.id).emit("roomIdChecked", 0);
    } else if (users != undefined) {
      io.to(socket.id).emit("roomIdChecked", 1);
    }
  });
  socket.on("give_id", () => {
    let ID = nanoid(4);
    io.to(socket.id).emit("rec_id", ID);
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
      socket.emit("takeHimIn", room_problems.get(room));
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
    async function getFinal() {
      let re_map = new Map();

      for (let j = 0; j < users.length; j++) {
        let handle_name1 = users[j].username;
        // async function getSetGo() {
        let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name1}`;
        let arr = [];
        for (let i = 0; i < problems.length; i++)
          [
            arr.push({
              result: false,
              penalty: 0,
              time: "Not solved",
              qno: i,
            }),
          ];
        const jsondata = await fetch(modified_url);
        const jsdata = await jsondata.json();
        for (let i = 0; i < jsdata.result.length; i++) {
          let str =
            jsdata.result[i].problem.contestId +
            "-" +
            jsdata.result[i].problem.index;

          if (problems.includes(str)) {
            let unix_timestamp = jsdata.result[i].creationTimeSeconds;
            var date = new Date(unix_timestamp * 1000);
            // Hours part from the timestamp
            var date1 = date.getDate();
            var month1 = date.getMonth();
            var hours = date.getHours();
            // Minutes part from the timestamp
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
              qno: problems.indexOf(str),
            };
            for (let l = 0; l < arr.length; l++) {
              if (arr[l].qno == problems.indexOf(str)) {
                res = arr[l];
                break;
              }
            }
            if (jsdata.result[i].verdict === "OK") {
              res.time = formattedTime;
              res.result = true;
            } else {
              if (act_dat == date1 && act_month == month1) {
                res.penalty++;
              }
            }
            for (let l = 0; l < arr.length; l++) {
              if (arr[l].qno == problems.indexOf(str)) {
                arr[l] = res;
                break;
              }
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

        if (arr.length < problems.length) {
          for (let i = 0; i < problems.length; i++) {
            let fl = 0;
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].qno == problems[i]) {
                fl = 1;
                break;
              }
            }
            if (!fl) {
              arr.push({
                result: false,
                penalty: 0,
                time: "Not solved",
                qno: i,
              });
            }
          }
        }
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
