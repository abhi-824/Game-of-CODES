let user_submissions;
let weak_topics = document.querySelector(".weak_topics");
let no_of_success;
let strong_topics = document.querySelector(".strong_topics");
let unsolved_problems = new Set();
let unsolved_problems_array = [];
let user_contests = "https://codeforces.com/api/user.rating?handle=";
let api_url = "https://codeforces.com/api/";
const url_info = " https://codeforces.com/api/user.info?handles=";
const url2 = "https://codeforces.com/api/user.status?handle=";
let solved = new Set();
let user_contest = [];
let handle_name;
google.charts.load("current", { packages: ["corechart"] });

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
let tag_map2 = new Map();
let weak_topicss = [];
let strong_topicss = [];
let weak_topicss2 = [];
let strong_topicss2 = [];


function getHandle() {
  var url = document.location.href,
    params = url.split("=")[1];
    params = params.split("&")[0];
    return params;
}
handle_name=getHandle();

function getHandle2() {
  var url = document.location.href,
    params = url.split("&")[1];
    return params;
}
let handle_name2=getHandle2();
console.log(handle_name)
console.log(handle_name2)
document.querySelector('.handle1').innerHTML=handle_name;
document.querySelector('.handle2').innerHTML=handle_name2;
document.querySelector('.handle_1').innerHTML=handle_name;
document.querySelector('.handle_2').innerHTML=handle_name2;

async function getsubmissions() {
  let modified_url = url2 + handle_name;
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  user_submissions = jsdata.result;

  let unsolved = new Set();

  unsolved.clear();
  solved.clear();

  // Initialise tag_map(for weak and strong topics)
  for (let i = 0; i < all_topics_name.length; i++) {
    tag_map.set(all_topics_name[i], 0);
  }
  let jj = 0;
  // for retreiving solved set
  for (let i = 0; i < jsdata.result.length; i++) {
    if (jsdata.result[i].verdict == "OK") {
      let str =
        jsdata.result[i].problem.contestId +
        "-" +
        jsdata.result[i].problem.index;
      solved.add(str);
      no_of_success = solved.size;
    }
  }

  // For weak and strong topics
  for (let i = 0; i < jsdata.result.length; i++) {
    if (jsdata.result[i].verdict == "OK") {
      let tags = jsdata.result[i].problem.tags;

      if (jsdata.result[i].problem.rating > 1400) {
        for (let i = 0; i < tags.length; i++) {
          jj = tag_map.get(tags[i]);
          if (jsdata.result[i].problem.rating != undefined) {
            jj = jj + jsdata.result[i].problem.rating / 1000;
          }
          tag_map.set(tags[i], jj + 1);
        }
      } else {
        for (let i = 0; i < tags.length; i++) {
          jj = tag_map.get(tags[i]);
          tag_map.set(tags[i], jj + 0.5);
        }
      }
    } else {
      let tags = jsdata.result[i].problem.tags;
      for (let i = 0; i < tags.length; i++) {
        jj = tag_map.get(tags[i]);

        tag_map.set(tags[i], jj - 0.35);
      }
    }
  }
  let sum = 0;
  let no2 = 0;

  for (let i of tag_map.values()) {
    if (i > 0) {
      sum += i;
      no2 += 1;
    }
  }

  let avg = sum / no2;

  for (let i of tag_map) {
    if (i[1] < avg) {
      weak_topicss.push(i[0]);
    } else {
      strong_topicss.push(i[0]);
    }
  }

  let tb = document.querySelector(".weak_topicss");
  console.log(weak_topicss);
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


}
getsubmissions();

async function getsubmissions2() {
  let modified_url = url2 + handle_name2;
  const jsondata = await fetch(modified_url);
  const jsdata = await jsondata.json();
  user_submissions = jsdata.result;

  let unsolved = new Set();

  unsolved.clear();
  solved.clear();

  // Initialise tag_map2(for weak and strong topics)
  for (let i = 0; i < all_topics_name.length; i++) {
    tag_map2.set(all_topics_name[i], 0);
  }
  let jj = 0;
  // for retreiving solved set
  for (let i = 0; i < jsdata.result.length; i++) {
    if (jsdata.result[i].verdict == "OK") {
      let str =
        jsdata.result[i].problem.contestId +
        "-" +
        jsdata.result[i].problem.index;
      solved.add(str);
      no_of_success = solved.size;
    }
  }

  // For weak and strong topics
  for (let i = 0; i < jsdata.result.length; i++) {
    if (jsdata.result[i].verdict == "OK") {
      let tags = jsdata.result[i].problem.tags;

      if (jsdata.result[i].problem.rating > 1400) {
        for (let i = 0; i < tags.length; i++) {
          jj = tag_map2.get(tags[i]);
          if (jsdata.result[i].problem.rating != undefined) {
            jj = jj + jsdata.result[i].problem.rating / 1000;
          }
          tag_map2.set(tags[i], jj + 1);
        }
      } else {
        for (let i = 0; i < tags.length; i++) {
          jj = tag_map2.get(tags[i]);
          tag_map2.set(tags[i], jj + 0.5);
        }
      }
    } else {
      let tags = jsdata.result[i].problem.tags;
      for (let i = 0; i < tags.length; i++) {
        jj = tag_map2.get(tags[i]);

        tag_map2.set(tags[i], jj - 0.35);
      }
    }
  }
  let sum = 0;
  let no2 = 0;

  for (let i of tag_map2.values()) {
    if (i > 0) {
      sum += i;
      no2 += 1;
    }
  }

  let avg = sum / no2;

  for (let i of tag_map2) {
    if (i[1] < avg) {
      weak_topicss2.push(i[0]);
    } else {
      strong_topicss2.push(i[0]);
    }
  }

  let tb = document.querySelector(".weak_topicss2");
  console.log(weak_topicss2);
  for (let i = 0; i < weak_topicss2.length; i++) {
    let tr = document.createElement("tr");
    let th1 = document.createElement("th"); 
    th1.innerHTML = weak_topicss2[i];

    tr.appendChild(th1);
    tb.appendChild(tr);
  }

  let tb1 = document.querySelector(".strong_topicss2");
  for (let i = 0; i < strong_topicss2.length; i++) {
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerHTML = strong_topicss2[i];
    tr.appendChild(th1);
    tb1.appendChild(tr);
  }


}
getsubmissions2();
document.querySelector("#dashboard1").addEventListener("click", function (e) {
    ////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let dash_url = "dashboard.html?handle=";
    dash_url += handle;
    document.location.href = dash_url;
  
    e.preventDefault();
  });
  
  document.querySelector("#compare1").addEventListener("click", function (e) {
    ////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let comp_url = "compare.html?handle=";
    comp_url += handle;
    document.location.href = comp_url;
  
    e.preventDefault();
  });
  
  document.querySelector("#codeblast1").addEventListener("click", function (e) {
    ////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "codeblast.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
  
    e.preventDefault();
  });
  