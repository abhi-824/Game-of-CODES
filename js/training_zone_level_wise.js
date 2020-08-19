document.querySelector(".l1").addEventListener("click", retreivel1);
document.querySelector(".l2").addEventListener("click", retreivel2);
document.querySelector(".l3").addEventListener("click", retreivel3);
document.querySelector(".update").addEventListener("click", update_problems);
document.querySelector(".add").addEventListener("click", add_problems);

const url2 = "https://codeforces.com/api/user.status?handle=";

function getHandle() {
  var url = document.location.href,
    params = url.split("=")[1];
  params = params.split("&")[0];
  return params;
}
let handle_name = getHandle();

let solved = new Set();
async function getSolved() {
  let modified_url = url2 + handle_name;
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();

  let unsolved = new Set();

  unsolved.clear();
  solved.clear();

  // for retreiving solved set
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
getSolved();
let problemskilist = new Set();
function fetch_problems(problems, low, high) {
  document.querySelector(".update").classList.remove("hidden");
  document.querySelector(".add").classList.remove("hidden");
  let problem_list = [];
  let j = 3;
  for (let i = 0; i < problems.length; i++) {
    if (
      problems[i].rating >= low &&
      problems[i].rating <= high &&
      solved.has(`${problems[i].contestId + "-" + problems[i].index}`) ==
        false &&
      problemskilist.has(
        `${problems[i].contestId + "-" + problems[i].index}`
      ) == false
    ) {
      problem_list.push(problems[i]);
      problemskilist.add(`${problems[i].contestId + "-" + problems[i].index}`);
      j--;
      if (j == -1) {
        break;
      }
    }
  }
  return problem_list;
}

console.log(handle_name);
let problems = [];
async function retreivel1() {
  animations();
  document.querySelector(".problemkilist").classList.add("lev1");

  if (confirm("Do You want to start a timer?")) {
    var two_hours = 2 * 60 * 60,
      display = document.querySelector(".timer");
    startTimer(two_hours, display);
  }

  let modified_url = "https://codeforces.com/api/problemset.problems";
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  problems = jsdata.result.problems;

  problems = fetch_problems(problems, 800, 1400);
  for (let i = 0; i < problems.length; i++) {
    let div = document.createElement("div");
    div.classList.add("problemhye");
    div.innerHTML = `<span>${problems[i].name}</span><a href="${convert_to_link(
      problems[i].contestID + "-" + problems[i].index
    )} target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

    document.querySelector(".problemkilist").appendChild(div);
  }
}

async function retreivel2() {
  animations();
  if (confirm("Do You want to start a timer?")) {
    var two_hours = 2 * 60 * 60,
      display = document.querySelector(".timer");
    startTimer(two_hours, display);
  }
  document.querySelector(".problemkilist").classList.add("lev2");
  let modified_url = "https://codeforces.com/api/problemset.problems";
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  problems = jsdata.result.problems;

  problems = fetch_problems(problems, 1200, 1900);
  for (let i = 0; i < problems.length; i++) {
    let div = document.createElement("div");
    div.classList.add("problemhye");
    div.innerHTML = `<span>${problems[i].name}</span><a href="${convert_to_link(
      problems[i].contestID + "-" + problems[i].index
    )} target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

    document.querySelector(".problemkilist").appendChild(div);
  }
}

async function retreivel3() {
  animations();
  document.querySelector(".problemkilist").classList.add("lev3");

  if (confirm("Do You want to start a timer?")) {
    var two_hours = 2 * 60 * 60,
      display = document.querySelector(".timer");
    startTimer(two_hours, display);
  }

  let modified_url = "https://codeforces.com/api/problemset.problems";
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  problems = jsdata.result.problems;

  problems = fetch_problems(problems, 1700, 3000);
  for (let i = 0; i < problems.length; i++) {
    let div = document.createElement("div");
    div.classList.add("problemhye");
    div.innerHTML = `<span>${problems[i].name}</span><a href="${convert_to_link(
      problems[i].contestID + "-" + problems[i].index
    )} target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

    document.querySelector(".problemkilist").appendChild(div);
  }
}

function animations() {
  document.querySelector(".l1").classList.add("animated");
  document.querySelector(".l2").classList.add("animated");
  document.querySelector(".l3").classList.add("animated");

  document.querySelector(".l1").classList.add("bounceOutRight");
  document.querySelector(".l2").classList.add("bounceOutUp");
  document.querySelector(".l3").classList.add("bounceOutLeft");

  document.querySelector(".problemkilist").classList.remove("hidden");
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
function startTimer(duration, display) {
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
      notifyMe();
      clearInterval(x);
    }
  }, 1000);
}
function update_problems() {}
let height = 100;
function add_problems() {
  let l1 = document.querySelector(".problemkilist");
  document.querySelector(".container4").style.height = `${height + 100}vh`;
  document.querySelector(".container2").style.height = `${height + 100}vh`;
  height += 50;
  if (l1.classList.contains("lev3")) {
    retreivel3();
  }
  if (l1.classList.contains("lev1")) {
    retreivel1();
  }
  if (l1.classList.contains("lev2")) {
    retreivel2();
  }
}
