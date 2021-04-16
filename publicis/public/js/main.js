function codeblast_enter(username, room) {
  show_screen(codeblast_screen2);
  const form = document.getElementById("chat-form");
  const chatMessages = document.querySelector(".chat-messages");
  const socket = io();
  var load_kkk = document.querySelector(".loader12345");

  socket.emit("joinRoom", { username, room });

  document.querySelector(".ready_btn").addEventListener("click", function (e) {
    socket.emit("ready", { username, room });
    document.querySelector(".ready_btn").classList.add("disabled");
    e.preventDefault();
  });

  document.querySelector(".leave_pls").addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("disconnect");
    window.location = "https://gameofcodes.herokuapp.com";
  });

  socket.on("le_result", (results_jo, user_list, index) => {
    load_kkk.classList.add("disapper");
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let i = 0;
    // for(let i=0;i<user_list.length;i++)
    // {

    td.innerHTML = `${user_list[index].username}`;
    tr.appendChild(td);

    //console.log(tr);
    let ch = "A";
    for (let i = 0; i < results_jo.length; i++) {
      // let th=document.createElement("th");
      // th.innerHTML=ch;
      ch++;
      let td2 = document.createElement("td");

      let j;
      if (results_jo[i]) {
        j = "Correct";
      } else {
        j = "Incorrect";
      }
      td2.innerHTML = j;
      tr.appendChild(td2);
    }
    table.appendChild(tr);
    // }
    table.classList = "table";
    document.querySelector(".containerOverlayCodeBlast").appendChild(table);
    load_kkk.classList.add("disapper");
  });

  socket.on("start_loader", (problems) => {
    load_kkk.classList.remove("disapper");
    load_kkk.classList.remove("hidden");
  });
  let start_time;
  socket.on("start_contest", (problems, time) => {
    // //console.log("hey");
    start_time = time;
    // load_kkk.classList.add('disapper');
    document.querySelector(".chat-container").remove();
    // setTimeout(() => {
    // problem = problems;
    for (let i = 0; i < problems.length; i++) {
      problem.push(problems[i]);
    }
    load_kkk.classList.add("disapper");
    // }, 2000);
    console.log(problems[0]);
    display_problems(problems);
    //console.log(problems);
    document.querySelector(".updateCodeblast").classList.remove("hidden");
  });
  let problem = [];
  document.querySelector(".updateCodeblast").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(problem[0]);
    socket.emit("results", room, problem);
  });

  socket.on("takeHimIn", (problems, time) => {
    start_time = time;
    for (let i = 0; i < problems.length; i++) {
      problem.push(problems[i]);
    }
    document.querySelector(".chat-container").remove();
    load_kkk.classList.add("disapper");
    document.querySelector(".updateCodeblast").classList.remove("hidden");
    display_problems(problems);
  });

  socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsersName(users);
  });

  socket.on("message", (message) => {
    //console.log(message);
    output_mess(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.querySelector(".messages").scrollTop = document.querySelector(
      ".messages"
    ).scrollHeight;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit("chatMessage", msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  });

  socket.on("go_results", (re_map) => {
    re_map = JSON.parse(re_map);
    let res_map = new Map(Object.entries(re_map));
    console.log(res_map);
    if (document.querySelector(".res_table") != undefined) {
      document.querySelector(".res_table").remove();
    }
    let table = document.createElement("table");
    table.className = "table";
    table.classList.add("res_table");
    let scores = [];
    let currWinner = {
      user: "boss",
      score: -1,
      lastTime: "23:59:59",
      penalty: 10000,
    };
    let min_percent = 30;
    let loss_per_min_percent = 0.004;

    res_map.forEach((element, key) => {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.innerHTML = key;
      let scoreElem = 0;
      let lastTime = "23:59:59";
      tr.appendChild(td);
      let totalPenalty = 0;
      console.log(res_map);
      var date = new Date(start_time);
      var act_date = new Date();
      for (let i = 0; i < element.length; i++) {
        let td = document.createElement("td");

        totalPenalty += element[i].penalty;
        let points = 0;
        console.log(act_date);
        console.log(date);
        let diff_time = Math.abs(date - act_date);
        console.log(diff_time);
        diff_time /= 1000;
        diff_time /= 60;
        if (element[i].time != "Not solved") {
          lastTime = lastTime > element[i].time ? lastTime : element[i].time;
          
        } 
        points= element[i].result?element[i].points:0;
        scoreElem +=points  ;

        td.innerHTML = `${points} | ${element[i].penalty} | ${element[i].time} `;
        tr.appendChild(td);
      }
      console.log(scoreElem);
      console.log(scoreElem);
      if (scoreElem > currWinner.score) {
        // if (lastTime == currWinner.lastTime) {
        // if (totalPenalty < currWinner.penalty) {
        currWinner = {
          user: key,
          score: scoreElem,
          lastTime: lastTime,
          penalty: totalPenalty,
        };
        // }
        // }
      }
      scores.push({
        user: key,
        score: scoreElem,
        lastTime: lastTime,
        penalty: totalPenalty,
      });
      console.log(scores);
      table.appendChild(tr);
    });
    displayWinner(currWinner);
    document.querySelector(".container2222").appendChild(table);
  });

  function output_mess(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
  }

  function outputRoomName(room) {
    document.getElementById("room-name").innerHTML = room;
  }

  function outputUsersName(user) {
    document.getElementById("users").innerHTML = `${user
      .map((user) => `<li>${user.username}</li>`)
      .join("")}`;
  }

  function display_problems(problems) {
    for (let i = 0; i < problems.length; i++) {
      problems[i] = problems[i][1];
    }
    let div = document.createElement("div");
    div.classList.add("container768");
    div.style = "max-width:800px;";
    div.innerHTML = `   <div class="box">
              <div class="content">
                <h2>A</h2>
                <h3><span class="problem-name-1 problems_hai_bhai">${
                  problems[0]
                }</span></h3>
                <p>
                </p>
                <div class="content1"><a href="${convert_to_link(
                  problems[0]
                )}" target="_blank">Do It</a></div>
              </div>
            </div>
      
            <div class="box">
              <div class="content">
                <h2>B</h2>
                <h3><span class="problem-name-2 problems_hai_bhai" >${
                  problems[1]
                }</span></h3>
                <!-- <p> 
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link: <div class="link2"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[1]
                )}" target="_blank">Do It</a></div>
              </div>
            </div>
      
            <div class="box">
              <div class="content">
                <h2>C</h2>
                <h3><span class="problem-name-3 problems_hai_bhai">${
                  problems[2]
                }</span></h3>
                <!-- <p>
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link:<div class="link3"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[2]
                )}" target="_blank">Do It</a></div>
			  </div>
			  
			</div>
			<div class="box">
              <div class="content">
                <h2>D</h2>
                <h3><span class="problem-name-3 problems_hai_bhai">${
                  problems[3]
                }</span></h3>
                <!-- <p>
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link:<div class="link3"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[3]
                )}" target="_blank">Do It</a></div>
              </div> `;
    document.querySelector(".container2222").appendChild(div);
    var two_hours = 90 * 60,
      display = document.querySelector(".timer22");
    startTimer(two_hours, display, problems);
  }
  function displayWinner(user) {
    console.log(user);
    let div = document.createElement("div");
    div.className = "wiinerAya";
    div.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    max-width: max-content;
    top: 0;
    right: 180px;`;
    div.innerHTML = `
    <img src="resources/stones/backgrounds/thanos.png" alt="" style="height:200px;">
    <h1 style="color:white">Current Winner</h1>
    <h1 style="color:white" class="username">${user.user}</h1>
    `;
    if (document.querySelector(".wiinerAya") != undefined) {
      document.querySelector(".wiinerAya").remove();
    }
    document.querySelector(".containerOverlayCodeBlast").appendChild(div);
  }
  function convert_to_link(str) {
    let p = "";
    let q = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "-") {
        for (let j = i + 1; j < str.length; j++) {
          q += str[j];
        }
        break;
      }
      p += str[i];
    }
    let link = `https://codeforces.com/problemset/problem/${p}/${q}`;
    return link;
  }

  function startTimer(duration, display, problems) {
    var timer = duration,
      minutes,
      seconds;
    let x = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
      if (display.textContent === "00:00") {
        display_alert("Timer is Over!!!");
        clearInterval(x);
      }
    }, 1000);
  }
}

function codeblast_team_enter(username, teamID, room, teamName) {
  show_screen(codeblast_screen2);

  const form = document.getElementById("chat-form");

  const chatMessages = document.querySelector(".chat-messages");
  const socket = io();
  var load_kkk = document.querySelector(".loader12345");
  socket.emit("joinRoomTeam", { username, room, teamID, teamName });

  socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputTeamName(teamID);
    outputUsersName(users);
  });

  document.querySelector(".ready_btn").addEventListener("click", function (e) {
    socket.emit("ready", { username, room });
    document.querySelector(".ready_btn").classList.add("disabled");
    e.preventDefault();
  });
  document.querySelector(".updateCodeblast").addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("results", room, problem);
  });
  socket.on("start_loader", (problems) => {
    load_kkk.classList.remove("disapper");
    load_kkk.classList.remove("hidden");
  });
  let arr = [];
  let teamNames = [];
  socket.on("start_contest", (problems) => {
    let ch = document.querySelectorAll(".userrs");

    for (let i = 0; i < ch.length; i++) {
      let str = ch[i].innerHTML;
      let teamName = str.split(":")[0];
      let username = str.split(":")[1];
      let obj = {
        teamName: teamName,
        handle: username,
      };
      let fl = 0;
      for (let i = 0; i < teamNames.length; i++) {
        if (teamNames[i] == teamName) {
          fl = 1;
        }
      }
      if (!fl) {
        teamNames.push(teamName);
      }
      arr.push(obj);
    }
    document.querySelector(".chat-container").remove();
    // setTimeout(() => {
    load_kkk.classList.add("disapper");
    // }, 2000);
    display_problems(problems);
    //console.log(problems);
    document.querySelector(".updateCodeblast").classList.remove("hidden");
    problem = problems;
  });
  socket.on("go_results", (re_map) => {
    re_map = JSON.parse(re_map);
    let res_map = new Map(Object.entries(re_map));
    console.log(res_map);
    if (document.querySelector(".res_table") != undefined) {
      document.querySelector(".res_table").remove();
    }
    let table = document.createElement("table");
    table.className = "table";
    table.classList.add("res_table");
    let scores = [];
    let currWinner = {
      teamName: "boss",
      score: -1,
      lastTime: "23:59:59",
      penalty: 10000,
    };
    let teamStats = [];
    let questionNumber;
    res_map.forEach((element, key) => {
      questionNumber = element.length;
    });
    let dummyArray = [];
    for (let i = 0; i < questionNumber; i++) {
      dummyArray.push({
        qno: i,
        result: false,
        penalty: 0,
        time: "Not Solved",
      });
    }
    for (let i = 0; i < teamNames.length; i++) {
      teamStats.push({
        teamName: teamNames[i],
        element: dummyArray,
      });
      scores.push({
        teamName: teamNames[i],
        score: 0,
        lastTime: "Not solved",
        penalty: 0,
      });
    }
    res_map.forEach((element, key) => {
      let teamName = "";
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].handle == key) {
          teamName = arr[i].teamName;
        }
      }
      for (let i = 0; i < element.length; i++) {
        for (let i1 = 0; i1 < teamStats.length; i1++) {
          if (teamStats[i1].teamName == teamName) {
            teamStats[i1].element[i].result =
              element[i].result || teamStats[i1].element[i].result;
            teamStats[i1].element[i].penalty += element[i].penalty;
            if (element[i].time != "Not solved") {
              teamStats[i1].element[i].time = element[i].time;
            }
          }
        }
        // td.innerHTML = `${element[i].result} | ${element[i].penalty} | ${element[i].time} `;
        // tr.appendChild(td);
      }
    });
    let mxScore = 0;
    for (let i = 0; i < teamStats.length; i++) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.innerHTML = teamStats[i].teamName;
      tr.appendChild(td);
      let score = 0;
      for (let j = 0; j < teamStats[i].element.length; j++) {
        let td = document.createElement("td");
        score += teamStats[i].element[j].result;
        console.log(score);
        td.innerHTML = `${teamStats[i].element[j].result} | ${teamStats[i].element[j].penalty} | ${teamStats[i].element[j].time} `;
        tr.appendChild(td);
      }

      for (let j = 0; j < scores.length; j++) {
        if (scores[j].teamName == teamStats[i].teamName) {
          scores[j].score = score;
          if (mxScore < score) {
            currWinner = scores[j];
            mxScore = score;
          }
        }
      }
      table.appendChild(tr);
    }

    console.log(teamStats);
    displayWinner(currWinner);
    document.querySelector(".container2222").appendChild(table);
  });
  socket.on("message", (message) => {
    //console.log(message);
    output_mess(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.querySelector(".messages").scrollTop = document.querySelector(
      ".messages"
    ).scrollHeight;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit("chatMessage", msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
  });

  function displayWinner(user) {
    console.log(user);
    let div = document.createElement("div");
    div.className = "wiinerAya";
    div.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    max-width: max-content;
    top: 0;
    right: 180px;`;
    div.innerHTML = `
    <img src="resources/stones/backgrounds/thanos.png" alt="" style="height:200px;">
    <h1 style="color:white">Current Winner</h1>
    <h1 style="color:white" class="username">${user.teamName}</h1>
    `;
    if (document.querySelector(".wiinerAya") != undefined) {
      document.querySelector(".wiinerAya").remove();
    }
    document.querySelector(".containerOverlayCodeBlast").appendChild(div);
  }
  function output_mess(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
  }

  function outputRoomName(room) {
    document.getElementById("room-name").innerHTML = room;
  }
  function outputTeamName(teamID) {
    document.getElementById("team-name").innerHTML = `Your Team ID: ${teamID}`;
  }

  function outputUsersName(user) {
    document.getElementById("users").innerHTML = `${user
      .map(
        (user) => `<li class="userrs">${user.teamName}:${user.username}</li>`
      )
      .join("")}`;
  }

  function convert_to_link(str) {
    let p = "";
    let q = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "-") {
        for (let j = i + 1; j < str.length; j++) {
          q += str[j];
        }
        break;
      }
      p += str[i];
    }
    let link = `https://codeforces.com/problemset/problem/${p}/${q}`;
    return link;
  }

  function display_problems(problems) {
    let div = document.createElement("div");
    div.classList.add("container768");
    div.style = "max-width:800px;";
    div.innerHTML = `   <div class="box">
              <div class="content">
                <h2>A</h2>
                <h3><span class="problem-name-1 problems_hai_bhai">${
                  problems[0]
                }</span></h3>
                <p>
                </p>
                <div class="content1"><a href="${convert_to_link(
                  problems[0]
                )}" target="_blank">Do It</a></div>
              </div>
            </div>
      
            <div class="box">
              <div class="content">
                <h2>B</h2>
                <h3><span class="problem-name-2 problems_hai_bhai" >${
                  problems[1]
                }</span></h3>
                <!-- <p> 
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link: <div class="link2"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[1]
                )}" target="_blank">Do It</a></div>
              </div>
            </div>
      
            <div class="box">
              <div class="content">
                <h2>C</h2>
                <h3><span class="problem-name-3 problems_hai_bhai">${
                  problems[2]
                }</span></h3>
                <!-- <p>
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link:<div class="link3"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[2]
                )}" target="_blank">Do It</a></div>
			  </div>
			  
			</div>
			<div class="box">
              <div class="content">
                <h2>D</h2>
                <h3><span class="problem-name-3 problems_hai_bhai">${
                  problems[3]
                }</span></h3>
                <!-- <p>
                  Attempts : <span class="attempts"></span><br>
                  Difficulty: <span class="difficulty"></span><br>
                  Tags: <span class="tags"></span><br>
                  Number of Submissions: <span class="submissions"></span><br>
                  Editorial Link:<div class="link3"></div>
                </p> -->
                <div class="content1"><a href="${convert_to_link(
                  problems[3]
                )}" target="_blank">Do It</a></div>
              </div> `;
    document.querySelector(".container2222").appendChild(div);
    var two_hours = 90 * 60,
      display = document.querySelector(".timer22");
    startTimer(two_hours, display, problems);
  }
  function startTimer(duration, display, problems) {
    var timer = duration,
      minutes,
      seconds;
    let x = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
      if (display.textContent === "00:00") {
        display_alert("Timer is Over!!!");
        clearInterval(x);
      }
    }, 1000);
  }
}
