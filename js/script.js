let item = document.querySelector(".item1");
let item2 = document.querySelector(".item2");
let item3 = document.querySelector(".item3");
let item4 = document.querySelector(".item4");
let user_submissions;
let show_daily_mix = document.querySelector(".daily-btn");
let show_daily_mix2 = document.querySelector(".daily-btn2");
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
let tag_name;
google.charts.load("current", { packages: ["corechart"] });

let website_url = "Profile.html?handle=";
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
  // This is for retrieving handle_nam
  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  document.querySelector(".form-control").value = `${data.handle}`;
  handle_name = data.handle;

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
    // getting solved set and weak nd strong topics and daily mix contests
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
      for (let i = 0; i < weak_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("button");
        th2.classList.add("btn");
        th2.classList.add("btn-light");
        th2.classList.add("btn-sm");
        th2.classList.add("practice_topic");
        th1.innerHTML = weak_topicss[i];
        th2.innerHTML = "Practice it";

        tr.appendChild(th1);
        tr.appendChild(th2);
        tb.appendChild(tr);
      }

      let tb1 = document.querySelector(".strong_topicss");
      for (let i = 0; i < strong_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("button");
        th1.innerHTML = strong_topicss[i];
        th2.classList.add("btn");
        th2.classList.add("btn-light");
        th2.classList.add("btn-sm");
        th2.classList.add("practice_topic");
        th2.innerHTML = "Practice it";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tb1.appendChild(tr);
      }

      no_of_success = solved.size;

      let no = document.querySelector(".no");
      no.innerHTML = no_of_success;
      let practice_each_topic = document.querySelectorAll(".practice_topic");

      for (let i = 0; i < practice_each_topic.length; i++) {
        practice_each_topic[i].addEventListener("click", function (e) {
          let new_tag_map = new Map();
          for (let i = 800; i < 3200; i += 100) {
            new_tag_map.set(i, 0);
          }
           tag_name =
            practice_each_topic[i].parentElement.firstChild.innerHTML;
          // //console.log(tag_name);
         function generate_easy_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if(solved.has(str)){
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (arr.problems[i].rating <= 1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (arr.problems[i].points <= 1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function generate_medium_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if(solved.has(str)){
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (arr.problems[i].rating <= 1700&&arr.problems[i].rating>1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (arr.problems[i].points <= 1700&&arr.problems[i].points >= 1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function generate_hard_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if(solved.has(str)){
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (arr.problems[i].rating <= 2400&&arr.problems[i].rating>1900) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (arr.problems[i].points >= 1500&&arr.problems[i].points <= 1900) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function make_list(A){
              let str=A.contestId+'-'+A.index;
              let p=convert_to_link(str);
              let li=document.createElement('li');
              li.innerHTML=`<a href=${p}>${str}</a>`;
              return li;
          }

          async function get_questions(){
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${tag_name}`;
            console.log(modified_url)
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let E=generate_easy_question(jsdata.result, 5);
            let M=generate_medium_question(jsdata.result,10);
            let H=generate_hard_question(jsdata.result,9);
            console.log(E)
            console.log(M)
            console.log(H)
            let arr1=[]
            arr1.push(E[0]); arr1.push(M[0]); arr1.push(H[0])
            let arr2=[]
            arr1.push(E[1]); arr1.push(M[1]); arr1.push(H[1])
            let arr3=[]
            arr1.push(E[2]); arr1.push(M[2]); arr1.push(H[2])
            let arr4=[]
            arr1.push(E[3]); arr1.push(M[3]); arr1.push(H[3])
            let arr5=[]
            arr1.push(E[4]); arr1.push(M[4]); arr1.push(H[4])
            let arr6=[]
            arr1.push(M[5]); arr1.push(M[6]); arr1.push(H[5])
            let arr7=[]
            arr1.push(M[7]); arr1.push(M[8]); arr1.push(H[6])
            let arr8=[]
            arr1.push(M[9]); arr1.push(H[7]); arr1.push(H[8])
            
        }
        get_questions()  


          function get_topic_graph() {
            // let modified_url2 = url2 + handle_name;
            // const jsondata2 = await fetch(modified_url2);
            // const jsdata = await jsondata2.json();
            let already = new Set();
            //console.log(user_submissions);
            let str =
              user_submissions[i].problem.contestId +
              "-" +
              user_submissions[i].problem.index;
            for (let i = 0; i < user_submissions.length; i++) {
              let tags = user_submissions[i].problem.tags;
              for (let j = 0; j < tags.length; j++) {
                if (tags[j] === tag_name) {
                  // //console.log(user_submissions[i].verdict)
                  if (user_submissions[i].verdict === "OK") {
                    if (user_submissions[i].problem.rating != undefined) {
                      let val = new_tag_map.get(
                        user_submissions[i].problem.rating
                      );
                      new_tag_map.set(
                        user_submissions[i].problem.rating,
                        val + 1
                      );
                    } else {
                      let val = new_tag_map.get(
                        user_submissions[i].problem.points
                      );
                      new_tag_map.set(
                        user_submissions[i].problem.points,
                        val + 1
                      );
                    }
                    already.add(str);
                  }
                }
              }
            }
            // //console.log(new_tag_map);
            document
              .querySelector("#chartContainer")
              .classList.remove("hidden");
            let datapoints = [];
            for (key of new_tag_map) {
              //console.log(key);
              datapoints.push({ x: key[0], y: key[1] });
            }
            var chart = new CanvasJS.Chart("chartContainer", {
              animationEnabled: true,
              theme: "dark1",
              backgroundColor: null,
              title: {
                text: `Rating wise correct submissions for ${tag_name}`,
              },

              axisX: {
                title: "Difficulty Rating",
                interval: 100,
              },
              data: [
                {
                  indexLabel: "{y}",
                  type: "column",
                  dataPoints: datapoints,
                },
              ],
            });
            chart.render();
            //console.log(new_tag_map);
          }
          get_topic_graph();
          // item.classList.add("hidden");
          item.classList.add("animated");
          item.classList.add("hinge");
          item2.classList.add("animated");
          item2.classList.add("hinge");
          item3.classList.add("animated");
          item3.classList.add("hinge");
          // item2.classList.add("hidden");
          // item3.classList.add("hidden");
          // item4.classList.add("hidden");
          document.querySelector("#chartContainer").classList.add("animated");
          document
            .querySelector("#chartContainer")
            .classList.add("bounceInRight");
          item4.classList.add("animated");
          item4.classList.add("hinge");

          document.querySelector(".heading").classList.add("hidden");
          document.querySelector(".problemsets").classList.remove("hidden");
          document.querySelector(".problemsets").classList.add("animated");
          document.querySelector(".problemsets").classList.add("zoomInDown");
          show_daily_mix2.classList.remove("hidden");
          e.preventDefault();
        });
      }
      document
        .querySelector(".generateDailyMix")
        .addEventListener("click", function (e) {
          item.classList.add("animated");
          document.querySelector(".wrapper").classList.add("hidden");
          item.classList.add("hinge");
          show_daily_mix2.classList.remove("hidden");
          document.querySelector(".cont1").classList.remove("hidden");
          item2.classList.add("animated");
          item2.classList.add("hinge");
          item3.classList.add("animated");
          item3.classList.add("hinge");
          item4.classList.add("animated");
          item4.classList.add("hinge");
          // document.querySelector('.container').classList.remove("hidden");
          let weak_index1 = Math.floor(Math.random() * weak_topicss.length);
          let weak_index2 = Math.floor(Math.random() * weak_topicss.length);
          let weak_index3 = Math.floor(Math.random() * weak_topicss.length);
          let strong_index1 = Math.floor(Math.random() * strong_topicss.length);
          let strong_index2 = Math.floor(Math.random() * strong_topicss.length);
          let weak_topic1 = weak_topicss[weak_index1];
          let weak_topic2 = weak_topicss[weak_index2];
          let weak_topic3 = weak_topicss[weak_index3];
          let strong_topic1 = strong_topicss[strong_index1];
          let strong_topic2 = strong_topicss[strong_index2];

          function generate_easy_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (arr.problems[i].rating <= 1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (arr.problems[i].points <= 1200) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function generate_medium_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (
                  arr.problems[i].rating <= 1700 &&
                  arr.problems[i].rating > 1200
                ) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (
                  arr.problems[i].points <= 1700 &&
                  arr.problems[i].points >= 1200
                ) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function generate_hard_question(arr, no) {
            let result = [];

            for (let i = 0; i < arr.problems.length; i++) {
              let str = arr.problems[i].contestId + "-" + arr.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (arr.problems[i].rating !== undefined) {
                if (
                  arr.problems[i].rating <= 2400 &&
                  arr.problems[i].rating > 1900
                ) {
                  no--;
                  result.push(arr.problems[i]);
                }
              } else {
                if (
                  arr.problems[i].points >= 1500 &&
                  arr.problems[i].points <= 1900
                ) {
                  no--;
                  result.push(arr.problems[i]);
                }
              }
            }
            return result;
          }
          function make_list(A) {
            let str = A.contestId + "-" + A.index;
            let p = convert_to_link(str);
            let li = document.createElement("li");
            li.innerHTML = `<a href=${p}>${str}</a>`;
            return li;
          }
          async function get_daily_mix_A() {
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${weak_topic1}`;
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let A = generate_easy_question(jsdata.result, 1);
            for (let i = 0; i < A.length; i++) {
              console.log(A);
              document.querySelector(".problem-name-A").innerHTML = A[0].name;
              let link = document.createElement("div");
              let p = convert_to_link(`${A[0].contestId}-${A[0].index}`);
              link.innerHTML = `<a href="${p}">Let's Do It</a>`;
              let div = document.querySelector(".linkA");
              console.log(div);
              while (div.firstChild) {
                console.log(div.firstChild);
                div.removeChild(div.firstChild);
              }
              document.querySelector(".linkA").appendChild(link);
              // li.classList.add("list-group-item");
              // document.querySelector('.list-of-problems-for-daily-mix').appendChild(li);
            }

            //console.log(jsdata.result);
          }

          async function get_daily_mix_B() {
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${weak_topic2}`;
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let A = generate_medium_question(jsdata.result, 1);
            for (let i = 0; i < A.length; i++) {
              // let li=make_list(A[i]);
              document.querySelector(".problem-name-B").innerHTML = A[0].name;
              let link = document.createElement("div");
              let div = document.querySelector(".linkB");
              while (div.firstChild) {
                div.removeChild(div.firstChild);
              }
              let p = convert_to_link(`${A[0].contestId}-${A[0].index}`);
              link.innerHTML = `<a href="${p}">Let's Do It</a>`;
              document.querySelector(".linkB").appendChild(link);
              // document.querySelector('.list-of-problems-for-daily-mix').appendChild(li);
            }
            //console.log(jsdata.result);
          }

          async function get_daily_mix_C() {
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${strong_topic1}`;
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let A = generate_medium_question(jsdata.result, 1);
            for (let i = 0; i < A.length; i++) {
              let li = make_list(A[i]);
              // li.classList.add("list-group-item");
              document.querySelector(".problem-name-C").innerHTML = A[0].name;
              let link = document.createElement("div");
              let div2 = document.querySelector(".linkC");
              while (div2.firstChild) {
                div2.removeChild(div2.firstChild);
              }
              let p = convert_to_link(`${A[0].contestId}-${A[0].index}`);
              link.innerHTML = `<a href="${p}">Let's Do It</a>`;
              console.log(link);
              document.querySelector(".linkC").appendChild(link);
              // document.querySelector('.list-of-problems-for-daily-mix').appendChild(li);
            }
            //console.log(jsdata.result);
          }

          async function get_daily_mix_D() {
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${weak_topic3}`;
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let A = generate_hard_question(jsdata.result, 1);
            for (let i = 0; i < A.length; i++) {
              // let li=make_list(A[i]);
              document.querySelector(".problem-name-D").innerHTML = A[0].name;
              let link = document.createElement("div");
              let div = document.querySelector(".linkD");
              while (div.firstChild) {
                div.removeChild(div.firstChild);
              }
              let p = convert_to_link(`${A[0].contestId}-${A[0].index}`);
              link.innerHTML = `<a href="${p}">Let's Do It</a>`;
              document.querySelector(".linkD").appendChild(link);
              // li.classList.add("list-group-item");
              // document.querySelector('.list-of-problems-for-daily-mix').appendChild(li);
            }
            //console.log(jsdata.result);
          }

          async function get_daily_mix_E() {
            let modified_url = `https://codeforces.com/api/problemset.problems?tags=${strong_topic2}`;
            const jsondata = await fetch(modified_url);
            const jsdata = await jsondata.json();
            let A = generate_hard_question(jsdata.result, 1);
            for (let i = 0; i < A.length; i++) {
              let li = make_list(A[i]);
              document.querySelector(".problem-name-E").innerHTML = A[0].name;
              let div = document.querySelector(".linkE");
              while (div.firstChild) {
                div.removeChild(div.firstChild);
              }
              let link = document.createElement("div");
              let p = convert_to_link(`${A[0].contestId}-${A[0].index}`);
              link.innerHTML = `<a href="${p}">Let's Do It</a>`;
              document.querySelector(".linkE").appendChild(link);
              // li.classList.add("list-group-item");
              // document.querySelector('.list-of-problems-for-daily-mix').appendChild(li);
            }
            //console.log(jsdata.result);
          }
          let p = document.querySelectorAll(".generate_daily");
          for (let i = 0; i < p.length; i++) {
            p[i].addEventListener("click", function (e) {
      
              // document.querySelector('.container').classList.remove("hidden");
              weak_index1 = Math.floor(Math.random() * weak_topicss.length);
              weak_index2 = Math.floor(Math.random() * weak_topicss.length);
              weak_index3 = Math.floor(Math.random() * weak_topicss.length);
              strong_index1 = Math.floor(
                Math.random() * strong_topicss.length
              );
              strong_index2 = Math.floor(
                Math.random() * strong_topicss.length
              );
              weak_topic1 = weak_topicss[weak_index1];
              weak_topic2 = weak_topicss[weak_index2];
              weak_topic3 = weak_topicss[weak_index3];
              strong_topic1 = strong_topicss[strong_index1];
              strong_topic2 = strong_topicss[strong_index2];
              get_daily_mix_A();
              get_daily_mix_B();
              get_daily_mix_C();
              get_daily_mix_D();
              get_daily_mix_E();
              document.querySelector(".container").classList.remove("hidden");
              e.preventDefault();
            });
          }
          e.preventDefault();
        });
    }

    getsubmissions();
    // get user name and avatar
    async function getname() {
      let modified_url2 = url_info + handle_name;

      const jsondata2 = await fetch(modified_url2);
      const jsdata2 = await jsondata2.json();
      let name = jsdata2.result[0].firstName;

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
    // for retreiving all upsolved problems
    async function getUpsolved() {
      let modified_url = user_contests + handle_name;
      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();

      for (let i = jsdata.result.length - 1; i >= 0; i--) {
        const user_contest_res = `https://codeforces.com/api/contest.standings?contestId=${jsdata.result[i].contestId}&from=1&count=5`;
        const jsondata3 = await fetch(user_contest_res);
        const jsdata2 = await jsondata3.json();
        for (let j = 0; j < jsdata2.result.problems.length; j++) {
          contests_problems.add([
            `${jsdata2.result.problems[j].contestId}-${jsdata2.result.problems[j].index}`,
            jsdata2.result.problems[j].rating,
          ]);
        }
      }

      for (const it of contests_problems) {
        if (solved.has(it[0]) === false) {
          let str = it;
          upsolved.push([it[1], str]);
        }
      }
      upsolved.sort();

      let table = document.querySelector(".problems");
      for (let i = 0; i < upsolved.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        th2.innerHTML = upsolved[i][0];
        th1.innerHTML = upsolved[i][1][0];
        th3.innerHTML = `<a class="question" href="${convert_to_link(
          upsolved[i][1][0]
        )}">Let's Do it</a>`;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
      }
      document.querySelector(".d-flex").classList.add("hidden");
    }

    getUpsolved();
    // for retreiving the unsolved questions
    async function getUnsolved() {
      let modified_url = url2 + handle_name;
      const jsondata = await fetch(modified_url);
      const jsdata = await jsondata.json();
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

      let table = document.querySelector(".unsolved_problems");

      for (let i = 0; i < unsolved_problems_array.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        th2.innerHTML = unsolved_problems_array[i][0];
        th1.innerHTML = unsolved_problems_array[i][1];
        th3.innerHTML = `<a class="question" href="${convert_to_link(
          unsolved_problems_array[i][1]
        )}">Let's Do it</a>`;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
      }
    }
    getUnsolved();
  });
  function show_please(item) {
    item.style.width = "30vw";
    item.style.transition = "1s";
    item.style.height = "25vh";
  }
  function hide_please(item) {
    item.style.width = "24vw";
    item.style.transition = "0.5s";
    item.style.height = "auto";
  }
  item.addEventListener("click", function (e) {
    show_please(item);
    hide_please(item2);
    hide_please(item3);
    hide_please(item4);
    daily_mix_contests.classList.add("hidden");
    weak_topics.classList.remove("hidden");
    weak_topics.classList.add("animated");
    weak_topics.classList.add("bounceInRight");
    unsolved_mysteries.classList.add("hidden");
    upsolve.classList.add("hidden");
    strong_topics.classList.add("hidden");
    show_daily_mix2.classList.remove("hidden");

    document.querySelector(".heading").classList.add("hidden");

    show_daily_mix.classList.remove("hidden");
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
    show_daily_mix.classList.remove("hidden");
    weak_topics.classList.add("hidden");
    show_daily_mix2.classList.remove("hidden");

    document.querySelector(".heading").classList.add("hidden");

    strong_topics.classList.add("animated");
    strong_topics.classList.add("bounceInRight");
    e.preventDefault();
  });
  item3.addEventListener("click", function (e) {
    show_please(item3);
    hide_please(item2);
    hide_please(item);
    hide_please(item4);
    daily_mix_contests.classList.add("hidden");
    upsolve.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    show_daily_mix.classList.remove("hidden");
    strong_topics.classList.add("hidden");
    show_daily_mix2.classList.remove("hidden");

    document.querySelector(".heading").classList.add("hidden");
    upsolve.classList.add("animated");
    upsolve.classList.add("bounceInRight");
    e.preventDefault();
  });
  item4.addEventListener("click", function (e) {
    show_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.add("hidden");
    unsolved_mysteries.classList.remove("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    show_daily_mix.classList.remove("hidden");
    strong_topics.classList.add("hidden");
    show_daily_mix2.classList.remove("hidden");

    document.querySelector(".heading").classList.add("hidden");
    unsolved_mysteries.classList.add("animated");
    unsolved_mysteries.classList.add("bounceInRight");
    e.preventDefault();
  });
  document.querySelector(".daily-btn").addEventListener("click", function (e) {
    hide_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.remove("hidden");
    daily_mix_contests.classList.add("animated");
    daily_mix_contests.classList.add("bounceInDown");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    show_daily_mix.classList.add("hidden");
    strong_topics.classList.add("hidden");

    e.preventDefault();
  });
  document.querySelector(".daily-btn2").addEventListener("click", function (e) {
    hide_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    document.querySelector(".cont1").classList.add("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    show_daily_mix.classList.add("hidden");
    document.querySelector(".container").classList.add("hidden");
    strong_topics.classList.add("hidden");
    item.classList.remove("hidden");
    item2.classList.remove("hidden");
    item3.classList.remove("hidden");
    item4.classList.remove("hidden");
    document.querySelector(".wrapper").classList.remove("hidden");
    item4.classList.remove("hinge");
    item3.classList.remove("hinge");
    item2.classList.remove("hinge");
    item.classList.remove("hinge");
    document.querySelector(".problemsets").classList.add("hidden");
    document.querySelector(".heading").classList.remove("hidden");
    document.querySelector("#chartContainer").classList.add("hidden");
    show_daily_mix2.classList.add("hidden");
    e.preventDefault();
  });
  document.querySelector(".profile").addEventListener("click", function (e) {
    let handle = document.querySelector(".form-control").value;
    website_url = website_url + handle;
    document.location.href = website_url;
    url = "Profile.html?handle=";
    e.preventDefault();
  });
}
window.onload = hello;
