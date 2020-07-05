let item = document.querySelector(".item1");
let item2 = document.querySelector(".item2");
let item3 = document.querySelector(".item3");
let item4 = document.querySelector(".item4");
let daily_mix_contests = document.querySelector(".daily-mix");
let weak_topics = document.querySelector(".weak_topics");
let no_of_success;
let strong_topics = document.querySelector(".strong_topics");
let upsolve = document.querySelector(".upsolve");
let unsolved_mysteries = document.querySelector(".unsolved_mysteries");
let unsolved_problems = new Set();
let unsolved_problems_array = [];
let user_contests = "https://codeforces.com/api/user.rating?handle=";
let api_url = "https://codeforces.com/api/";
const url_info = " https://codeforces.com/api/user.info?handles=";
const url2 = "https://codeforces.com/api/user.status?handle=";
let solved = new Set();
let user_contest = [];
let contests_problems = new Set();
let upsolved = [];
let handle_name;
let all_topics_name = [
  "implementation",
  "dp",
  "math",
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
let tag_map = new Map();
let weak_topicss = [];
let strong_topicss = [];

function hello() {
  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  // console.log(data);
  document.querySelector(".form-control").value = `${data.handle}`;
  console.log(data.handle);
  handle_name = data.handle;
  // console.log(handle_name);
  console.log(document.querySelector(".form-control").value);
  $(document).ready(function () {
    // get solved set
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
    async function getsubmissions1() {
      // $(".upsolve").empty()/
      let modified_url = url2 + handle_name;

      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();
      // console.log(jsdata.result)
      let unsolved = new Set();
      let unsolved_link = [];
      unsolved.clear();
      solved.clear();
      // console.log(data);
      for (let i = 0; i < all_topics_name.length; i++) {
        tag_map.set(all_topics_name[i], 0);
      }
      let jj = 0;

      for (let i = 0; i < jsdata.result.length; i++) {
        if (jsdata.result[i].verdict == "OK") {
          let str =
            jsdata.result[i].problem.contestId +
            "-" +
            jsdata.result[i].problem.index;
          solved.add(str);
          let tags = jsdata.result[i].problem.tags;
          if (jsdata.result[i].problem.rating > 1400) {
            for (let i = 0; i < tags.length; i++) {
              jj = tag_map.get(tags[i]);

              tag_map.set(tags[i], jj + 1);
            }
          } else {
            for (let i = 0; i < tags.length; i++) {
              jj = tag_map.get(tags[i]);
              tag_map.set(tags[i], jj + 0.5);
            }
          }
          // if (jsdata.result[i].verdict !== "OK") {
          //     jj=-jj;
        } else {
          let tags = jsdata.result[i].problem.tags;
          for (let i = 0; i < tags.length; i++) {
            jj = tag_map.get(tags[i]);

            tag_map.set(tags[i], jj - 0.3);
          }
        }
      }
      let sum = 0;
      let no2 = 0;
      // console.log(tag_map)
      for (let i of tag_map.values()) {
        if (i > 0) {
          sum += i;
          console.log(sum);
          no2 += 1;
        }
        // console.log(i);
      }
      let avg = sum / no2;
      console.log(avg);

      for (let i of tag_map) {
        if (i[1] < avg) {
          weak_topicss.push(i[0]);
        } else {
          strong_topicss.push(i[0]);
        }
      }

      console.log(strong_topicss);
      console.log(weak_topicss);
      console.log(tag_map);
      let tb = document.querySelector(".weak_topicss");
      for (let i = 0; i < weak_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = weak_topicss[i];
        tr.appendChild(th1);
        tb.appendChild(tr);
      }
      let tb1 = document.querySelector(".strong_topicss");
      for (let i = 0; i < strong_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = strong_topicss[i];
        tr.appendChild(th1);
        tb1.appendChild(tr);
      }
      // console.log(solved)
      no_of_success = solved.size;
      let no = document.querySelector(".no");
      no.innerHTML = no_of_success;
      // console.log(no_of_success)
    }
    getsubmissions1();
    // //console.log(solved);
    // get user name and avatar
    async function getname() {
      //console.log(handle_name)
      let modified_url2 = url_info + handle_name;

      const jsondata2 = await fetch(modified_url2);
      const jsdata2 = await jsondata2.json();
      //console.log(jsdata2.result)
      let name = jsdata2.result[0].firstName;
      //console.log(jsdata2.result)

      let user = document.querySelector(".user");
      let user_avatar = document.querySelector(".user_avatar");
      let str = jsdata2.result[0].titlePhoto;
      let p = "http://";
      str = str.substr(2);
      let arr = [p, str];
      let stt = arr.join("");
      user_avatar.innerHTML = `<img src="${stt}" class="avatar"></img>`;
      user.innerHTML = name;
    }
    getname();
    // for retreiving all contests problems
    async function getsubmissions() {
      // $(".upsolve").empty()
      let modified_url = user_contests + handle_name;

      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();
      //console.log(jsdata.result)
      for (let i = jsdata.result.length - 1; i >= 0; i--) {
        const user_contest_res = `https://codeforces.com/api/contest.standings?contestId=${jsdata.result[i].contestId}&from=1&count=5`;
        const jsondata3 = await fetch(user_contest_res);
        const jsdata2 = await jsondata3.json();
        // console.log(jsdata2.result.problems);
        for (let j = 0; j < jsdata2.result.problems.length; j++) {
          contests_problems.add([
            `${jsdata2.result.problems[j].contestId}-${jsdata2.result.problems[j].index}`,
            jsdata2.result.problems[j].rating,
          ]);
        }
      }
      // console.log(contests_problems);
      // console.log(solved);
      for (const it of contests_problems) {
        if (solved.has(it[0]) === false) {
          let str = it;

          upsolved.push([it[1], str]);
          // console.log(it);
        }
      }
      upsolved.sort();
      // console.log(upsolved);
      let table = document.querySelector(".problems");
      for (let i = 0; i < upsolved.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        th2.innerHTML = upsolved[i][0];
        th1.innerHTML = upsolved[i][1][0];
        // th3.innerHTML=convert_to_link();
        th3.innerHTML = `<a href="${convert_to_link(
          upsolved[i][1][0]
        )}">Let's Do it</a>`;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
      }
    }
    getsubmissions();
    // for retreiving the unsolved questions
    async function getunsolved() {
      let modified_url = url2 + handle_name;
      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();
      // console.log(jsdata.result);
      let j = 0;

      for (let i = 0; i < jsdata.result.length; i++) {
        let str = `${jsdata.result[i].problem.contestId}-${jsdata.result[i].problem.index}`;
        if (solved.has(str) === false) {
          let arra = [jsdata.result[i].problem.rating, str];
          if (j === 0) {
            unsolved_problems.add(arra);
            j = 1;
          } else {
            let fl = 0;
            for (let it of unsolved_problems) {
              if (it[1] === str) {
                fl = 1;
              }
            }
            if (fl === 0) unsolved_problems.add(arra);
          }
        }
      }
      for (let it of unsolved_problems) {
        unsolved_problems_array.push(it);
      }
      unsolved_problems_array.sort();
      console.log(unsolved_problems_array);
      let table = document.querySelector(".unsolved_problems");
      for (let i = 0; i < unsolved_problems_array.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        th2.innerHTML = unsolved_problems_array[i][0];
        th1.innerHTML = unsolved_problems_array[i][1];
        th3.innerHTML = `<a href="${convert_to_link(
          unsolved_problems_array[i][1]
        )}">Let's Do it</a>`;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
      }
    }
    getunsolved();
  });
  function show_please(item) {
    item.style.width = "30vw";
    item.style.height = "25vh";
  }
  function hide_please(item) {
    item.style.width = "24vw";
    item.style.height = "auto";
  }
  item.addEventListener("click", function (e) {
    show_please(item);
    hide_please(item2);
    hide_please(item3);
    hide_please(item4);
    daily_mix_contests.classList.add("hidden");
    weak_topics.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    upsolve.classList.add("hidden");
    strong_topics.classList.add("hidden");
    // insert_weak_topics();
    e.preventDefault();
  });
  item2.addEventListener("click", function (e) {
    show_please(item2);
    hide_please(item);
    hide_please(item3);
    hide_please(item4);
    daily_mix_contests.classList.add("hidden");
    strong_topics.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    upsolve.classList.add("hidden");
    weak_topics.classList.add("hidden");
    // insert_weak_topics();

    e.preventDefault();
  });
  item3.addEventListener("click", function (e) {
    // console.log("aur bhai kya haal chaal");
    show_please(item3);
    hide_please(item2);
    hide_please(item);
    hide_please(item4);
    daily_mix_contests.classList.add("hidden");
    upsolve.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    strong_topics.classList.add("hidden");
    // insert_weak_topics();

    e.preventDefault();
  });
  item4.addEventListener("click", function (e) {
    // console.log("aur bhai kya haal chaal");
    show_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.add("hidden");
    unsolved_mysteries.classList.remove("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    strong_topics.classList.add("hidden");
    // insert_weak_topics();
    e.preventDefault();
  });
  document.querySelector(".heading").addEventListener("click", function (e) {
    hide_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    strong_topics.classList.add("hidden");
    e.preventDefault();
  });
}
window.onload = hello;
// console.log(handle_name)
