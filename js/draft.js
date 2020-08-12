const form = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();
let all_topics_name = [
  "implementation",
  "dp",
  "Math.floor(Math",
  "greedy",
  "brute force",
  "data structures",
  "constructive algorithms",
  "dfs and similar",
  "sortings",
  "binary search",
  "graphs",
  "trees",
  "strings",
  "number theory",
  "geometry",
  "combinatorics",
  "two pointers",
  "dsu",
  "bitmasks",
  "probabilities",
  "shortest paths",
  "hashing",
  "divide and conquer",
  "games",
  "matrices",
  "flows",
  "string suffix structures",
  "expression parsing",
  "graph matchings",
  "ternary search",
  "meet -in -the - middle",
  "fft",
  "chinese remainder theorem",
  "schedules",
];
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
document.querySelector(".ready_btn").addEventListener("click", function () {
  socket.emit("ready", { username, room });
  document.querySelector(".ready_btn").classList.add("disabled");
});
socket.emit("joinRoom", { username, room });
socket.on("start_contest", () => {
  start_contest();
  console.log("hoja shuru");
});
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsersName(users);
});
socket.on("message", (message) => {
  console.log(message);
  output_mess(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
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
function start_contest() {
  make_problems();
  document.querySelector(".chat-container").classList.add("hidden");
  document.querySelector(".contest-container").classList.remove("hidden");
}
let solved = new Set();

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
let random_diff,
  low = 800,
  high = 1200;
let random_index;
let url = "https://codeforces.com/api/problemset.problems?tags=";
async function get_first_problem() {
  random_diff = Math.floor(Math.random() * (high - low) + low);
  random_index = Math.floor(Math.random() * 33);
  let modified_url = url + all_topics_name[random_index];
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  let result = jsdata.result;
  console.log(modified_url);
  for (let i = 0; i < result.length; i++) {
    if (result[i].rating <= high && result[i].rating >= low) {
      display(result[i]);
      break;
    }
  }
}
async function get_second_problem() {
  random_diff = Math.floor(Math.random() * (high - low) + low);
  random_index = Math.floor(Math.random() * 33);
  let modified_url = url + all_topics_name[random_index];
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  let result = jsdata.result;
  for (let i = 0; i < result.length; i++) {
    if (result[i].rating <= high && result[i].rating >= low) {
      display(result[i]);
      break;
    }
  }
}
async function get_third_problem() {
  random_diff = Math.floor(Math.random() * (high - low) + low);
  random_index = Math.floor(Math.random() * 33);
  let modified_url = url + all_topics_name[random_index];
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  let result = jsdata.result;
  for (let i = 0; i < result.length; i++) {
    if (result[i].rating <= high && result[i].rating >= low) {
      display(result[i]);
      break;
    }
  }
}
function make_problems() {
  get_first_problem();
  high = 1900;
  low = 1200;
  get_second_problem();
  high = 3000;
  low = 1900;
  get_third_problem();
  // let tr1=document.querySelector('problem1');
  // let tr2=document.createElement('problem2');
  // let tr3=document.createElement('problem3');
  // let name=document.createElement('div');
  // name.innerHTML=`<a href=$//{convert_to_link(first)}>${second}</a>`;
  // tr1.appendChild(name);
  // name.innerHTML='';
  // name.innerHTML=`<a href=${convert_to_link(second)}>${second}</a>`;
  // tr2.appendChild(name);
  // name.innerHTML='';
  // name.innerHTML=`<a href=${convert_to_link(third)}>${third}</a>`;
  // tr3.appendChild(name);
}
function display(problem) {
  let prob = document.createElement("div");
  let problem_name = document.createElement("h1");
  let str = problem.contestId + "-" + problem.index;
  problem_name.innerHTML = `<a href=${convert_to_link(str)}>${problem.name}`;
  prob.appendChild(problem_name);
  document.querySelector(".problems").appendChild(prob);
}
