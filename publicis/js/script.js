var load_kkk = document.querySelector(".load-kro2");
function dashboard(handle_name) {
  show_screen(document.querySelector('.container1'));
  let item = document.querySelector(".item1");
  let item2 = document.querySelector(".item2");
  let item3 = document.querySelector(".item3");
  let item4 = document.querySelector(".item4");
  let user_submissions;
  var load_kk = document.querySelector(".load-kro");

  let show_daily_mix = document.querySelector(".daily-btn");
  let show_daily_mix2 = document.querySelector(".daily-btn2");
  let daily_mix_contests = document.querySelector(".daily-mix");
  let weak_topics = document.querySelector(".weak_topics");
  let no_of_success;
  let strong_topics = document.querySelector(".strong_topics");
  let upsolve = document.querySelector(".upsolve");
  let unsolved_mysteries = document.querySelector(".unsolved_mysteries");
  let unsolved_problems = new Set();
  let tag_name;
  let unsolved_problems_array = [];
  let user_contests = "https://codeforces.com/api/user.rating?handle=";
  let api_url = "https://codeforces.com/api/";
  const url_info = " https://codeforces.com/api/user.info?handles=";
  const url2 = "https://codeforces.com/api/user.status?handle=";
  let solved = new Set();
  let user_contest = [];
  let contests_problems = new Set();
  let upsolved = [];

  google.charts.load("current", { packages: ["corechart"] });
  document.querySelector(".search-img").addEventListener("click", function (e) {
    document.querySelector(".search_kro").classList.remove("hidden");
    document.querySelector(".search_kro").classList.add("bounceInRight");
  });

  document
    .querySelector(".skip-button")
    .addEventListener("click", function (e) {
      document.querySelector(".tr-wr").classList.add("hidden");
      e.preventDefault();
    });

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
    if(jsdata.status=="FAILED")
    {
      if(jsdata.comment==`handle: User with handle ${handle_name} not found`)
      {
        updateHandle();
      }
    }
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
        document.querySelector(".container1").style.height = "200vh";
        document.querySelector(".container2").style.height = "200vh";
        let new_tag_map = new Map();
        for (let i = 800; i < 3200; i += 100) {
          new_tag_map.set(i, 0);
        }
        let tag_name =
          practice_each_topic[i].parentElement.firstChild.innerHTML;
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
              if (arr.problems[i].rating <= 1200 && arr.problemStatistics[i].solvedCount>=5000) {
                no--;
                ///print 
                console.log(arr.problems[i].contestId, arr.problemStatistics[i].solvedCount);
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
                arr.problems[i].rating <= 1500 &&
                arr.problems[i].rating > 1200 && arr.problemStatistics[i].solvedCount>=3000
              ) {
                no--;
                console.log(arr.problems[i].contestId, arr.problemStatistics[i].solvedCount);
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
                arr.problems[i].rating <= 1900 &&
                arr.problems[i].rating > 1500 && arr.problemStatistics[i].solvedCount>=1000
              ) {
                no--;
                console.log(arr.problems[i].contestId, arr.problemStatistics[i].solvedCount);
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
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let arr6 = [];
        let arr7 = [];
        let arr8 = [];

        async function get_questions() {
          let modified_url = `https://codeforces.com/api/problemset.problems?tags=${tag_name}`;
          const jsondata = await fetch(modified_url);
          const jsdata = await jsondata.json();
          let E = generate_easy_question(jsdata.result, 5);
          let M = generate_medium_question(jsdata.result, 10);
          let H = generate_hard_question(jsdata.result, 9);
          arr1.push(E[0]);
          arr1.push(M[0]);
          arr1.push(H[0]);
          arr2.push(E[1]);
          arr2.push(M[1]);
          arr2.push(H[1]);
          arr3.push(E[2]);
          arr3.push(M[2]);
          arr3.push(H[2]);
          arr4.push(E[3]);
          arr4.push(M[3]);
          arr4.push(H[3]);
          arr5.push(E[4]);
          arr5.push(M[4]);
          arr5.push(H[4]);
          arr6.push(M[5]);
          arr6.push(M[6]);
          arr6.push(H[5]);
          arr7.push(M[7]);
          arr7.push(M[8]);
          arr7.push(H[6]);
          arr8.push(M[9]);
          arr8.push(H[7]);
          arr8.push(H[8]);
        }
        get_questions();
        let p = document.querySelectorAll(".generate_daily2");
        ////console.log(p);
        for (let i = 0; i < 8; i++) {
          p[i].addEventListener("click", function (e) {
            let curr_set = [];
            if (i === 0) {
              curr_set = arr1;
            } else if (i === 1) {
              curr_set = arr2;
            } else if (i === 2) {
              curr_set = arr3;
            } else if (i === 3) {
              curr_set = arr4;
            } else if (i === 4) {
              curr_set = arr5;
            } else if (i === 5) {
              curr_set = arr6;
            } else if (i === 6) {
              curr_set = arr7;
            } else if (i === 7) {
              curr_set = arr8;
            }
            document.querySelector(".container1").style.height = "300vh";
            document.querySelector(".container2").style.height = "300vh";
            div = document.querySelector(".problem-name-3");
            // //////console.log(div);
            while (div.firstChild) {
              // //////console.log(div.firstChild);
              div.removeChild(div.firstChild);
            }
            div = document.querySelector(".problem-name-2");
            // //////console.log(div);
            while (div.firstChild) {
              // //////console.log(div.firstChild);
              div.removeChild(div.firstChild);
            }
            div = document.querySelector(".problem-name-1");
            // //////console.log(div);
            while (div.firstChild) {
              // //////console.log(div.firstChild);
              div.removeChild(div.firstChild);
            }
            for (let i = 0; i < curr_set.length; i++) {
              let link = document.createElement("div");
              let p = convert_to_link(
                `${curr_set[i].contestId}-${curr_set[i].index}`
              );

              link.innerHTML = `<a href="${p}" target="_blank">Let's Do It</a>  <i class="fa fa-heart ptani_kahan_hu" aria-hidden="true"></i>`;

              if (i == 0) {
                document.querySelector(".problem-name-1").innerHTML =
                  curr_set[i].name;
                let div = document.querySelector(".link1");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                document.querySelector(".link1").appendChild(link);
              }
              if (i == 1) {
                document.querySelector(".problem-name-2").innerHTML =
                  curr_set[i].name;

                let div = document.querySelector(".link2");
                //////console.log(div);
                while (div.firstChild) {
                  //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                document.querySelector(".link2").appendChild(link);
              }
              if (i == 2) {
                document.querySelector(".problem-name-3").innerHTML =
                  curr_set[i].name;

                let div = document.querySelector(".link3");
                //////console.log(div);
                while (div.firstChild) {
                  //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                document.querySelector(".link3").appendChild(link);
              }
            }
            add_listeners_for_favs_wek_str(
              document.querySelectorAll(".ptani_kahan_hu")
            );
            document.querySelector(".container768").classList.remove("hidden");
            document.querySelector(".container768").classList.add("animated");
            document
              .querySelector(".container768")
              .classList.add("bounceInRight");
            e.preventDefault();
          });
        }
        document.querySelector(".update2").classList.remove("hidden");
        document
          .querySelector(".update2")
          .addEventListener("click", function (e) {
            let solved2 = new Set();
            async function get_result() {
              let modified_url = url2 + handle_name;
              const jsondata = await fetch(modified_url);
              const jsdata = await jsondata.json();
              user_submissions = jsdata.result;

              solved2.clear();

              let jj = 0;
              // for retreiving solved set
              for (let i = 0; i < jsdata.result.length; i++) {
                if (jsdata.result[i].verdict == "OK") {
                  let str =
                    jsdata.result[i].problem.contestId +
                    "-" +
                    jsdata.result[i].problem.index;
                  solved2.add(str);
                  no_of_success = solved.size;
                }
              }
              for (let i = 0; i < 8; i++) {
                let curr_set = [];
                if (i === 0) {
                  curr_set = arr1;
                } else if (i === 1) {
                  curr_set = arr2;
                } else if (i === 2) {
                  curr_set = arr3;
                } else if (i === 3) {
                  curr_set = arr4;
                } else if (i === 4) {
                  curr_set = arr5;
                } else if (i === 5) {
                  curr_set = arr6;
                } else if (i === 6) {
                  curr_set = arr7;
                } else if (i === 7) {
                  curr_set = arr8;
                }
                let cnt = 0;
                //console.log(curr_set);
                for (let j = 0; j < curr_set.length; j++) {
                  //console.log(
                  //   `${curr_set[j].contestId}-${curr_set[j].id}`,
                  //   solved2.has(`${curr_set[j].contestId}-${curr_set[j].id}`)
                  // );
                  if (
                    solved2.has(`${curr_set[j].contestId}-${curr_set[j].index}`)
                  ) {
                    curr_set[j] = 0;
                    if (j === 0) {
                      //console.log(curr_set);
                      document.querySelector(
                        ".problem-name-1"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".link1").classList.add("hidden");
                    }

                    if (j === 1) {
                      document.querySelector(
                        ".problem-name-2"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".link2").classList.add("hidden");
                    }

                    if (j === 2) {
                      document.querySelector(
                        ".problem-name-3"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".link3").classList.add("hidden");
                    }

                    cnt += 1;
                  }
                }

                if (cnt == 3) {
                  if (i == 0) {
                    document.querySelector(".g_2").classList.add("hidden");
                    document.querySelector(".g2").classList.remove("hidden");
                  }
                  if (i == 1) {
                    document.querySelector(".g_3").classList.add("hidden");
                    document.querySelector(".g3").classList.remove("hidden");
                  }
                  if (i == 2) {
                    document.querySelector(".g_4").classList.add("hidden");
                    document.querySelector(".g4").classList.remove("hidden");
                  }
                  if (i == 3) {
                    document.querySelector(".g_5").classList.add("hidden");
                    document.querySelector(".g5").classList.remove("hidden");
                  }
                }
              }
            }
            get_result();

            e.preventDefault();
          });
        e.preventDefault();
        // ////////console.log(tag_name);

        function get_topic_graph() {
          // let modified_url2 = url2 + handle_name;
          // const jsondata2 = await fetch(modified_url2);
          // const jsdata = await jsondata2.json();
          let already = new Set();
          ////////console.log(user_submissions);
          let str =
            user_submissions[i].problem.contestId +
            "-" +
            user_submissions[i].problem.index;
          for (let i = 0; i < user_submissions.length; i++) {
            let tags = user_submissions[i].problem.tags;
            for (let j = 0; j < tags.length; j++) {
              if (tags[j] === tag_name) {
                // ////////console.log(user_submissions[i].verdict)
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
          // ////////console.log(new_tag_map);
          document.querySelector("#chartContainer").classList.remove("hidden");
          let datapoints = [];
          for (key of new_tag_map) {
            ////////console.log(key);
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
          ////////console.log(new_tag_map);
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
        document.querySelector(".cont1").classList.remove("hidden");
        // document.querySelector(".container768").classList.remove("hidden");
        document.querySelector(".problemsets").classList.add("animated");
        document.querySelector(".problemsets").classList.add("zoomInDown");
        show_daily_mix2.classList.remove("hidden");
        e.preventDefault();
      });
    }
    document
      .querySelector(".generateDailyMix")
      .addEventListener("click", function (e) {
        load_kkk.classList.remove("hidden");
        item.classList.add("animated");
        document.querySelector(".wrapper").classList.add("hidden");
        document.querySelector(".update").classList.remove("hidden");
        item.classList.add("hinge");
        show_daily_mix2.classList.remove("hidden");
        document.querySelectorAll(".cont1")[1].classList.remove("hidden");
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
        let set1 = [];
        let set2 = [];
        let set3 = [];
        let set4 = [];
        let proper_result = [];
        var request = new XMLHttpRequest();

        request.open(
          "GET",
          "https://codeforces.com/api/problemset.problems",
          true
        );
        request.onload = function () {
          var data = JSON.parse(this.response);
          proper_result = data.result;
          ////console.log(proper_result);
          function get_daily_mix_A(set_no) {
            let result = [];
            let no = 1;
            for (let i = 0; i < proper_result.problems.length; i++) {
              ////console.log(proper_result.problems[i].tags)
              if (
                proper_result.problems[i].tags.includes(weak_topic1) == false
              ) {
                continue;
              }
              let str =
                proper_result.problems[i].contestId +
                "-" +
                proper_result.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              let fl = 0;
              //////console.log(set1.length);
              //////console.log(set2.length);
              //////console.log(set3.length);
              //////console.log(set4.length);
              for (let j = 0; j < set1.length; j++) {
                if (set1[j][0] === proper_result.problems[i].name) {
                  //////console.log(proper_result.problems[i].name);
                  fl = 1;
                  break;
                }
              }
              for (let j = 0; j < set2.length; j++) {
                if (set2[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set3.length; j++) {
                if (set3[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set4.length; j++) {
                if (set4[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              if (fl === 1) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (proper_result.problems[i].rating !== undefined) {
                if (proper_result.problems[i].rating <= 1200 && proper_result.problemStatistics[i].solvedCount>=5000) {
                  no = no - 1;
                  console.log("HERE", proper_result.problems[i].contestId, proper_result.problemStatistics[i].solvedCount);
                  result.push(proper_result.problems[i]);
                }
              } else {
                if (proper_result.problems[i].points <= 1200 && proper_result.problemStatistics[i].solvedCount>=5000) {
                  no = no - 1;
                  console.log("HERE", proper_result.problems[i].contestId, proper_result.problemStatistics[i].solvedCount);
                  result.push(proper_result.problems[i]);
                }
              }
            }
            let A = result;
            for (let i = 0; i < A.length; i++) {
              //////console.log(A);
              if (set_no === 1) {
                set1.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 2) {
                set2.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 3) {
                set3.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 4) {
                set4.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              }
            }
            // get_daily_mix_B(set_no);
            ////////console.log(proper_result);
          }

          function get_daily_mix_B(set_no) {
            // let A = generate_medium_question(proper_result, 1);
            let result = [];
            let no = 1;
            for (let i = 0; i < proper_result.problems.length; i++) {
              if (
                proper_result.problems[i].tags.includes(strong_topic1) == false
              ) {
                continue;
              }
              let str =
                proper_result.problems[i].contestId +
                "-" +
                proper_result.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              let fl = 0;
              for (let j = 0; j < set1.length; j++) {
                if (set1[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set2.length; j++) {
                if (set2[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set3.length; j++) {
                if (set3[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set4.length; j++) {
                if (set4[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              if (fl === 1) {
                continue;
              }
              if (no == 0) {
                break;
              }

              if (proper_result.problems[i].rating !== undefined) {
                if (
                  proper_result.problems[i].rating <= 1300 &&
                  proper_result.problems[i].rating > 1200 && proper_result.problemStatistics[i].solvedCount>=3000
                ) {
                  no--;
                  console.log("HERE");
                  result.push(proper_result.problems[i]);
                }
              } else {
                if (
                  proper_result.problems[i].points <= 1300 &&
                  proper_result.problems[i].points >= 1200 && proper_result.problemStatistics[i].solvedCount>=3000
                ) {
                  no--;
                  console.log("HERE");
                  result.push(proper_result.problems[i]);
                }
              }
            }
            let A = result;

            for (let i = 0; i < A.length; i++) {
              if (set_no === 1) {
                set1.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 2) {
                set2.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 3) {
                set3.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 4) {
                set4.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              }
            }

            // get_daily_mix_C(set_no);
            ////////console.log(proper_result);
          }

          function get_daily_mix_C(set_no) {
            // let A = generate_medium_question(proper_result, 1);
            let result = [];
            let no = 1;
            for (let i = 0; i < proper_result.problems.length; i++) {
              if (
                proper_result.problems[i].tags.includes(weak_topic2) == false
              ) {
                continue;
              }
              let str =
                proper_result.problems[i].contestId +
                "-" +
                proper_result.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              let fl = 0;
              for (let j = 0; j < set1.length; j++) {
                if (set1[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set2.length; j++) {
                if (set2[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set3.length; j++) {
                if (set3[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  break;
                }
              }
              for (let j = 0; j < set4.length; j++) {
                if (set4[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              if (fl === 1) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (proper_result.problems[i].rating !== undefined) {
                if (
                  proper_result.problems[i].rating <= 1500 &&
                  proper_result.problems[i].rating > 1300 && proper_result.problemStatistics[i].solvedCount>=3000
                ) {
                  no--;
                  console.log("HERE");
                  result.push(proper_result.problems[i]);
                }
              } else {
                if (
                  proper_result.problems[i].points <= 1500 &&
                  proper_result.problems[i].points >= 1200 && proper_result.problemStatistics[i].solvedCount>=3000
                ) {
                  no--;
                  console.log("HERE");
                  result.push(proper_result.problems[i]);
                }
              }
            }
            let A = result;
            for (let i = 0; i < A.length; i++) {
              if (set_no === 1) {
                set1.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 2) {
                set2.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 3) {
                set3.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 4) {
                set4.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              }
            }
            ////////console.log(proper_result);
            // get_daily_mix_D(set_no);
          }

          function get_daily_mix_D(set_no) {
            // let A = generate_hard_question(proper_result, 1);
            let result = [];
            let no = 1;
            for (let i = 0; i < proper_result.problems.length; i++) {
              if (
                proper_result.problems[i].tags.includes(strong_topic2) == false
              ) {
                continue;
              }
              let str =
                proper_result.problems[i].contestId +
                "-" +
                proper_result.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              let fl = 0;
              for (let j = 0; j < set1.length; j++) {
                if (set1[j][0] === proper_result.problems[i].name) {
                  //////console.log(set2[j][0]);
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set2.length; j++) {
                if (set2[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set3.length; j++) {
                if (set3[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set4.length; j++) {
                if (set4[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              if (fl === 1) {
                continue;
              }
              if (no == 0) {
                break;
              }

              if (proper_result.problems[i].rating !== undefined) {
                if (
                  proper_result.problems[i].rating <= 1700 &&
                  proper_result.problems[i].rating > 1500 && proper_result.problemStatistics[i].solvedCount>=1000 
                ) {
                  no--;
                  console.log("hi there");
                  result.push(proper_result.problems[i]);
                }
              } else {
                if (
                  proper_result.problems[i].points >= 1500 &&
                  proper_result.problems[i].points <= 1700 && proper_result.problemStatistics[i].solvedCount>=1000
                ) {
                  no--;
                  console.log("hi there");
                  result.push(proper_result.problems[i]);
                }
              }
            }
            let A = result;
            for (let i = 0; i < A.length; i++) {
              if (set_no === 1) {
                set1.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 2) {
                set2.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 3) {
                set3.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 4) {
                set4.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              }
            }
          }

          function get_daily_mix_E(set_no) {
            // let A = generate_hard_question(proper_result, 1);
            let result = [];
            let no = 1;
            for (let i = 0; i < proper_result.problems.length; i++) {
              if (
                proper_result.problems[i].tags.includes(weak_topic3) == false
              ) {
                continue;
              }
              let str =
                proper_result.problems[i].contestId +
                "-" +
                proper_result.problems[i].index;
              if (solved.has(str)) {
                continue;
              }
              let fl = 0;
              for (let j = 0; j < set1.length; j++) {
                if (set1[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set2.length; j++) {
                if (set2[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set3.length; j++) {
                if (set3[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              for (let j = 0; j < set4.length; j++) {
                if (set4[j][0] === proper_result.problems[i].name) {
                  fl = 1;
                  //////console.log(proper_result.problems[i].name);
                  break;
                }
              }
              if (fl === 1) {
                continue;
              }
              if (no == 0) {
                break;
              }
              if (proper_result.problems[i].rating !== undefined) {
                if (
                  proper_result.problems[i].rating <= 3000 &&
                  proper_result.problems[i].rating > 1700 && proper_result.problemStatistics[i].solvedCount>=1000
                ) {
                  no--;
                  console.log("hey");
                  result.push(proper_result.problems[i]);
                }
              } else {
                if (
                  proper_result.problems[i].points >= 1700 &&
                  proper_result.problems[i].points <= 3000 && proper_result.problemStatistics[i].solvedCount>=1000
                ) {
                  no--;
                  console.log("hey");
                  result.push(proper_result.problems[i]);
                }
              }
            }
            let A = result;
            for (let i = 0; i < A.length; i++) {
              if (set_no === 1) {
                set1.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 2) {
                set2.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 3) {
                set3.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              } else if (set_no === 4) {
                set4.push([A[0].name, `${A[0].contestId}-${A[0].index}`]);
              }
            }
          }
          let p = document.querySelectorAll(".generate_daily");
          ////console.log(p);
          for (let i = 0; i < 4; i++) {
            p[i].addEventListener("click", function (e) {
              weak_index1 = Math.floor(Math.random() * weak_topicss.length);
              weak_index2 = Math.floor(Math.random() * weak_topicss.length);
              weak_index3 = Math.floor(Math.random() * weak_topicss.length);
              strong_index1 = Math.floor(Math.random() * strong_topicss.length);
              strong_index2 = Math.floor(Math.random() * strong_topicss.length);
              weak_topic1 = weak_topicss[weak_index1];
              weak_topic2 = weak_topicss[weak_index2];
              weak_topic3 = weak_topicss[weak_index3];
              strong_topic1 = strong_topicss[strong_index1];
              strong_topic2 = strong_topicss[strong_index2];
              // setInterval(function(){

              get_daily_mix_A(i + 1);
              get_daily_mix_B(i + 1);
              get_daily_mix_C(i + 1);
              get_daily_mix_D(i + 1);
              get_daily_mix_E(i + 1);

              // p[i].addEventListener("click", function (e) {
              ////console.log("kya bhai")
              var r = confirm("This would start a timer!!");
              if (r == true) {
                document.querySelector("#time").classList.remove("hidden");
                document
                  .querySelector(".contest-time")
                  .classList.remove("hidden");
                var two_hours = 60 * 2 * 60,
                  display = document.querySelector("#time");
                startTimer(two_hours, display);
                let curr_set = [];
                if (i === 0) {
                  curr_set = set1;
                } else if (i === 1) {
                  curr_set = set2;
                } else if (i === 2) {
                  curr_set = set3;
                } else if (i === 3) {
                  curr_set = set4;
                }
                // if (curr_set.length !== 5) {
                //   get_daily_mix_A(i + 1);
                //   if (i === 0) {
                //     curr_set = set1;
                //   } else if (i === 1) {
                //     curr_set = set2;
                //   } else if (i === 2) {
                //     curr_set = set3;
                //   } else if (i === 3) {
                //     curr_set = set4;
                //   }
                // }
                let div = document.querySelector(".problem-name-E");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                div = document.querySelector(".problem-name-D");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                div = document.querySelector(".problem-name-C");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                div = document.querySelector(".problem-name-B");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                div = document.querySelector(".problem-name-A");
                // //////console.log(div);
                while (div.firstChild) {
                  // //////console.log(div.firstChild);
                  div.removeChild(div.firstChild);
                }
                for (let i = 0; i < curr_set.length; i++) {
                  let link = document.createElement("div");
                  let p = convert_to_link(`${curr_set[i][1]}`);
                  link.innerHTML = `<a href="${p}" target="_blank">Let's Do It</a>  <i class="fa fa-heart again_nahi_pta" aria-hidden="true"></i>`;
                  if (i == 0) {
                    document.querySelector(".problem-name-A").innerHTML =
                      curr_set[i][0];
                    let div = document.querySelector(".linkA");
                    // //////console.log(div);
                    while (div.firstChild) {
                      // //////console.log(div.firstChild);
                      div.removeChild(div.firstChild);
                    }
                    document.querySelector(".linkA").appendChild(link);
                  }
                  if (i == 1) {
                    document.querySelector(".problem-name-B").innerHTML =
                      curr_set[i][0];

                    let div = document.querySelector(".linkB");
                    //////console.log(div);
                    while (div.firstChild) {
                      //////console.log(div.firstChild);
                      div.removeChild(div.firstChild);
                    }
                    document.querySelector(".linkB").appendChild(link);
                  }
                  if (i == 2) {
                    document.querySelector(".problem-name-C").innerHTML =
                      curr_set[i][0];

                    let div = document.querySelector(".linkC");
                    //////console.log(div);
                    while (div.firstChild) {
                      //////console.log(div.firstChild);
                      div.removeChild(div.firstChild);
                    }
                    document.querySelector(".linkC").appendChild(link);
                  }
                  if (i == 3) {
                    document.querySelector(".problem-name-D").innerHTML =
                      curr_set[i][0];

                    let div = document.querySelector(".linkD");
                    //////console.log(div);
                    while (div.firstChild) {
                      //////console.log(div.firstChild);
                      div.removeChild(div.firstChild);
                    }
                    document.querySelector(".linkD").appendChild(link);
                  }
                  if (i == 4) {
                    document.querySelector(".problem-name-E").innerHTML =
                      curr_set[i][0];

                    let div = document.querySelector(".linkE");
                    //////console.log(div);
                    while (div.firstChild) {
                      //////console.log(div.firstChild);
                      div.removeChild(div.firstChild);
                    }
                    document.querySelector(".linkE").appendChild(link);
                  }
                }
                add_listeners_for_favs_wek_str(
                  document.querySelectorAll(".again_nahi_pta")
                );
                document
                  .querySelector(".problem_set_tera")
                  .classList.remove("hidden");
                document
                  .querySelector(".problem_set_tera")
                  .classList.add("animated");
                document
                  .querySelector(".problem_set_tera")
                  .classList.add("bounceInRight");
                e.preventDefault();
              } else {
                hide_please(item4);
                hide_please(item2);
                hide_please(item3);
                hide_please(item);
                daily_mix_contests.classList.remove("hidden");
                unsolved_mysteries.classList.add("hidden");
                document.querySelector(".cont1").classList.add("hidden");
                document.querySelectorAll(".cont1")[1].classList.add("hidden");
                document.querySelector(".update").classList.add("hidden");
                document.querySelector(".update2").classList.add("hidden");
                weak_topics.classList.add("hidden");
                upsolve.classList.add("hidden");
                show_daily_mix.classList.add("hidden");
                document
                  .querySelector(".problem_set_tera")
                  .classList.add("hidden");
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
                document
                  .querySelector("#chartContainer")
                  .classList.add("hidden");
                show_daily_mix2.classList.add("hidden");
              }

              // },2000);
            });
            //////console.log(set1);
            //////console.log(set2);
            //////console.log(set3);
            //////console.log(set4);
            load_kkk.classList.add("disapper");
            document.querySelector(".container1").style.height = "200vh";
            document.querySelector(".container2").style.height = "200vh";
          }
        };
        request.send();
        document
        .querySelector(".update")
        .addEventListener("click", function (e) {
          let solved2 = new Set();
          async function get_result() {
              let modified_url = url2 + handle_name;
              const jsondata = await fetch(modified_url);
              const jsdata = await jsondata.json();
              user_submissions = jsdata.result;
              
              solved2.clear();
              
              let jj = 0;
              // for retreiving solved set
              for (let i = 0; i < jsdata.result.length; i++) {
                if (jsdata.result[i].verdict == "OK") {
                  let str =
                  jsdata.result[i].problem.contestId +
                    "-" +
                    jsdata.result[i].problem.index;
                    solved2.add(str);
                    no_of_success = solved2.size;
                  }
                }
                for (let i = 0; i < 4; i++) {
                  let curr_set = [];
                  if (i === 0) {
                    curr_set = set1;
                  } else if (i === 1) {
                    curr_set = set2;
                  } else if (i === 2) {
                    curr_set = set3;
                  } else if (i === 3) {
                    curr_set = set4;
                  }
                  let cnt2 = 0;
                  for (let j = 0; j < curr_set.length; j++) {
                    //console.log(curr_set[j][1]);
                  if (solved2.has(curr_set[j][1])) {
                    // curr_set[j][1] = 0;
                    if (j === 0) {
                      document.querySelector(
                        ".problem-name-A"
                        ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".linkA").classList.add("hidden");
                    }
                    
                    if (j === 1) {
                      document.querySelector(
                        ".problem-name-B"
                        ).innerHTML = `Goto Next, You have done it.`;
                        document.querySelector(".linkB").classList.add("hidden");
                      }

                    if (j === 2) {
                      document.querySelector(
                        ".problem-name-C"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".linkC").classList.add("hidden");
                    }

                    if (j === 3) {
                      document.querySelector(
                        ".problem-name-D"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".linkD").classList.add("hidden");
                    }

                    if (j === 4) {
                      document.querySelector(
                        ".problem-name-E"
                      ).innerHTML = `Goto Next, You have done it.`;
                      document.querySelector(".linkE").classList.add("hidden");
                    }
                    cnt2 += 1;
                  }
                }
                console.log(cnt2)
                if (cnt2 == 5) {
                  if (i == 0) {
                    document.querySelectorAll(".g_2_daily")[0].classList.add("hidden");
                    document.querySelectorAll(".g_2_daily")[1].classList.add("hidden");
                    document.querySelector(".g2_daily").classList.remove("hidden");
                  }
                  if (i == 1) {
                    document.querySelectorAll(".g_3_daily")[0].classList.add("hidden");
                    document.querySelectorAll(".g_3_daily")[1].classList.add("hidden");
                    document.querySelector(".g3_daily").classList.remove("hidden");
                  }
                  if (i == 2) {
                    document.querySelectorAll(".g_4_daily")[0].classList.add("hidden");
                    document.querySelectorAll(".g_4_daily")[1].classList.add("hidden");
                    document.querySelector(".g4_daily").classList.remove("hidden");
                  }
                  if (i == 3) {
                    document.querySelectorAll(".g_5_daily")[0].classList.add("hidden");
                    document.querySelectorAll(".g_5_daily")[1].classList.add("hidden");
                    document.querySelector(".g5_daily").classList.remove("hidden");
                  }
                }
              }
            }
            get_result();

            e.preventDefault();
          });
        e.preventDefault();
      });
  }

  getsubmissions();
  // get user name and avatar
  async function getname() {
    let modified_url2 = url_info + handle_name;

    const jsondata2 = await fetch(modified_url2);
    const jsdata2 = await jsondata2.json();
    let name = jsdata2.result[0].firstName || "user";

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
  document.querySelector('.upsolve_refresh').addEventListener('click',getUpsolved);
  async function getUpsolved() {
    let modified_url = user_contests + handle_name;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    document.querySelector(".yes").addEventListener("click", function (e) {
      let val = document.querySelector(".time_val").value;
      startTimer(val * 60, document.querySelector(".time_chalo"));
      document.querySelector(".ask_perm").classList.add("animated");
      document.querySelector(".ask_perm").classList.add("bounceOutLeft");
      e.preventDefault();
    });

    document.querySelector(".no").addEventListener("click", function (e) {
      document.querySelector(".ask_perm").classList.add("hidden");
      e.preventDefault();
    });

    let solved = new Set();

    let modified_url_sol = url2 + handle_name;
    const jsondata_sol = await fetch(modified_url_sol);
    const jsdata_sol = await jsondata_sol.json();

    solved.clear();
    for (let i = 0; i < jsdata_sol.result.length; i++) {
      if (jsdata_sol.result[i].verdict == "OK") {
        let str =
          jsdata_sol.result[i].problem.contestId +
          "-" +
          jsdata_sol.result[i].problem.index;
        solved.add(str);
      }
    }
    let problems = [];
    let contests_given = new Set();
    let prob_url = "https://codeforces.com/api/problemset.problems";

    const jsondataP = await fetch(prob_url);
    const jsdataP = await jsondataP.json();

    for (let i = 0; i < jsdata.result.length; i++) {
      contests_given.add(jsdata.result[i].contestId);
    }
    let upsolved = [];
    for (let i = 0; i < jsdataP.result.problems.length; i++) {
      if (
        contests_given.has(jsdataP.result.problems[i].contestId) &&
        solved.has(
          `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`
        ) == false
      ) {
		  let rating=jsdataP.result.problems[i].rating!=undefined?jsdataP.result.problems[i].rating:"Not Revealed!";
        upsolved.push([rating,
          `${jsdataP.result.problems[i].contestId}-${jsdataP.result.problems[i].index}`]
        );
      }
    }
    upsolved.sort();

	let table = document.querySelector(".problems");
	table.innerHTML='';
    for (let i = 0; i < upsolved.length; i++) {
      let tr = document.createElement("tr");
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      th2.innerHTML = upsolved[i][0];
      th1.innerHTML = upsolved[i][1];
      th3.innerHTML = `<a class="question" href="${convert_to_link(
        upsolved[i][1]
      )}" target="_blank">Let's Do It</a><i class="fa fa-heart upsolve_bookmarks" aria-hidden="true"></i>`;
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      table.appendChild(tr);
    }
    add_listeners_for_favs(document.querySelectorAll(".upsolve_bookmarks"));

    document.querySelector(".d-flex").classList.add("hidden");

    document.querySelector(".yes").addEventListener("click", function (e) {
      let val = document.querySelector(".time_val").value;
      startTimer(val * 60, document.querySelector(".time_chalo"));
      document.querySelector(".ask_perm").classList.add("animated");
      document.querySelector(".ask_perm").classList.add("bounceOutLeft");
      e.preventDefault();
    });

    document.querySelector(".no").addEventListener("click", function (e) {
      document.querySelector(".ask_perm").classList.add("hidden");
      ////console.log("h");
      e.preventDefault();
    });
    // clearInterval(pppp);

    // }
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
      )}" target="_blank">Let's Do It</a>  <i class="fa fa-heart unsolve_bookmarks" aria-hidden="true"></i>`;
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      table.appendChild(tr);
    }
    add_listeners_for_favs(document.querySelectorAll(".unsolve_bookmarks"));
  }
  getUnsolved();

  function show_please(item) {
    item.style.width = "30vw";
    item.style.transition = "1s";
    item.style.height = "20vh";
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

    hide_please(item3);
    document.querySelector("#bookmarkspakd").classList.add("hidden");
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

    hide_please(item3);
    document.querySelector("#bookmarkspakd").classList.add("hidden");
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

    document.querySelector(".time_chalo").classList.remove("hidden");
    document.querySelector(".ask_perm").classList.remove("hidden");
    upsolve.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    show_daily_mix.classList.remove("hidden");
    strong_topics.classList.add("hidden");
    show_daily_mix2.classList.remove("hidden");
    document.querySelector("#bookmarkspakd").classList.add("hidden");

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
    hide_please(item3);
    document.querySelector("#bookmarkspakd").classList.add("hidden");
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
    document.querySelector(".ask_perm").classList.add("hidden");
    hide_please(item3);
    document.querySelector("#bookmarkspakd").classList.add("hidden");
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.classList.remove("hidden");
    daily_mix_contests.classList.add("animated");
    daily_mix_contests.classList.add("bounceInDown");
    unsolved_mysteries.classList.add("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    document.querySelector(".container1").style.height = "100vh";
    document.querySelector(".container2").style.height = "100vh";
    show_daily_mix.classList.add("hidden");
    strong_topics.classList.add("hidden");

    e.preventDefault();
  });
  document.querySelector(".daily-btn2").addEventListener("click", function (e) {
    hide_please(item4);
    hide_please(item2);
    hide_please(item3);
    document.querySelector("#bookmarkspakd").classList.add("hidden");
    // document.querySelector('.ask_perm').classList.add('hidden');
    document.querySelector(".time_chalo").classList.add("hidden");
    hide_please(item);
    document.querySelector(".container1").style.height = "100vh";
    document.querySelector(".container2").style.height = "100vh";
    document.querySelector("#time").classList.add("hidden");
    document.querySelector(".ask_perm").classList.add("hidden");
    document.querySelector(".contest-time").classList.add("hidden");
    daily_mix_contests.classList.remove("hidden");
    unsolved_mysteries.classList.add("hidden");
    document.querySelector(".cont1").classList.add("hidden");
    document.querySelectorAll(".cont1")[1].classList.add("hidden");
    document.querySelector(".update").classList.add("hidden");
    document.querySelector(".update2").classList.add("hidden");
    weak_topics.classList.add("hidden");
    upsolve.classList.add("hidden");
    show_daily_mix.classList.add("hidden");
    document.querySelector(".problem_set_tera").classList.add("hidden");
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

  var request = new XMLHttpRequest();
  let app = document.querySelector(".future-contests");

  request.open("GET", "https://codeforces.com/api/contest.list", true);

  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data["result"].forEach((contest) => {
        var cid = contest.id;
        var cname = contest.name;

        // GETTING TIME UNTIL CONTEST STARTS AND CONVERTING TO HH:MM:SS

        var totalSeconds = contest.relativeTimeSeconds;
        totalSeconds = totalSeconds * -1;
        var chours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        // var cminutes = Math.floor(totalSeconds / 60);
        // var cseconds = totalSeconds % 60;

        var link = "https://codeforces.com/contestRegistration/" + cid;
        let months_list = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        var link = "https://codeforces.com/contestRegistration/" + cid;

        if (contest.phase === "BEFORE") {
          const b = document.createElement("th");

          const a = document.createElement("a");
          a.textContent = "Register";
          a.href = link;
          a.target = "_blank";

          let start_time = contest.startTimeSeconds * 1000;
          let full_date = new Date(start_time);
          let date = full_date.getDate();
          let month = full_date.getMonth();
          month = months_list[month];
          let hour = full_date.getHours();
          let minutes = full_date.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes.toString();
          }

          ////console.log(full_date, date, month, hour, minutes);

          const li = document.createElement("li");
          li.textContent = cname;

          const h6 = document.createElement("h6");
          h6.textContent = date + " " + month + ", " + hour + ":" + minutes;

          /* WOULD BE NEEDED FOR MM:SS
  
          /* WOULD BE NEEDED FOR MM:SS
                    ":" + cminutes + ":" +cseconds
                    */
          b.appendChild(li);
          b.appendChild(h6);
          b.appendChild(a);
          b.classList.add("table_row");
          app.appendChild(b);
        }
      });
    }
  };

  request.send();

  // FUTURE CONTESTS END

  // Timer for countdown
  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    let c = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        display_alert("Time's Up!!!");
        clearInterval(c);
      }
    }, 1000);
  }
  let target_val;
  if (!protection_mode) {
    var user = firebase.auth().currentUser;
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const handle_list = doc.data();
          if (handle_list.email === user.email) {
            target_val = handle_list.target;
          }
        });
      });
    startTarget(target_val);
  }

  document.querySelector(".set-target").addEventListener("click", function (e) {
    if (protection_mode) {
      show_screen(index_screen);
      display_alert("You can't Access it as a guest. Register, Its Free!");
      e.stopImmediatePropagation();
    } else {
      //console.log("hell");
      var user = firebase.auth().currentUser;
      target_val = document.querySelector("#target-val").value;
      db.collection("handles")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const handle_list = doc.data();
            if (handle_list.email === user.email) {
              db.collection("handles").doc(doc.id).update({
                target: target_val,
              });

              document.querySelector(".tr-wr").classList.add("hidden");
            }
          });
        });
      startTarget(target_val);
      ////console.log(target_val);
    }
    e.preventDefault();
  });
  function startTarget(target) {
    let target_bar = document.querySelector(".targetline");
    setInterval(() => {
      let currrent = 0;
      async function getTargetandrock() {
        let modified_url = url2 + handle_name;
        const jsondata = await fetch(modified_url);
        const jsdata = await jsondata.json();
        for (let i = 0; i < jsdata.result.length; i++) {
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
          var act_dat = new Date();
          let act_month = act_dat.getMonth();
          let act_date = act_dat.getDate();
          if (jsdata.result[i].verdict == "OK") {
            // //console.log(date1);
            // //console.log(act_date);
            // //console.log(act_month);
            // //console.log(month1);
            // //console.log(formattedTime);
            if (date1 === act_date && act_month === month1) {
              currrent += jsdata.result[i].problem.rating;
            }
          }
        }
        //console.log(currrent);
        //console.log(target_val);
        let wid_gr = (100 * currrent) / parseInt(target_val);
        let target_line = document.querySelector(".targetline");
        document.querySelector(
          ".targetline"
        ).style = `background-image:-webkit-linear-gradient(top, green, green ${wid_gr}%, transparent ${wid_gr}%, transparent 100%)  `;
        //console.log(wid_gr);
      }

      getTargetandrock();
    }, 30000);
  }

  window.setTimeout(() => {}, 10000);

  let cl = 0;
  var user = firebase.auth().currentUser;

  function bookmark_question(questionId) {
    var user = firebase.auth().currentUser;
    let array_bookmarks = [];
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const handle_list = doc.data();
          if (handle_list.email === user.email) {
            if (handle_list.bookmarks != undefined) {
              array_bookmarks = handle_list.bookmarks;

              array_bookmarks.push(questionId);
              db.collection("handles").doc(doc.id).update({
                email: handle_list.email,
                handle: handle_list.handle,
                target: handle_list.target,
                bookmarks: array_bookmarks,
              });
              // db.collection('handles').doc(doc.id).delete();
            } else {
              array_bookmarks.push(questionId);
              db.collection("handles").add({
                email: handle_list.email,
                handle: handle_list.handle,
                target: handle_list.target,
                bookmarks: array_bookmarks,
              });
              db.collection("handles").doc(doc.id).delete();
            }
          }
        });
      });
  }
  function add_listeners_for_favs(fav) {
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let array_bookmarks = [];
          const handle_list = doc.data();
          if (handle_list.email === user.email) {
            if (handle_list.bookmarks != undefined) {
            }
            array_bookmarks = handle_list.bookmarks;
            //console.log(handle_list);
            for (let i = 0; i < fav.length; i++) {
              let questionId =
                fav[i].parentElement.parentElement.firstChild.innerHTML;
              if (array_bookmarks != undefined) {
                for (let j = 0; j < array_bookmarks.length; j++) {
                  if (array_bookmarks[j] == questionId) {
                    //console.log("pppppppppppp");
                    fav[i].style.color = "red";
                  }
                }
              }
            }

            for (let i = 0; i < fav.length; i++) {
              //console.log("hey");

              fav[i].addEventListener("click", (e) => {
                e.preventDefault();
                if (protection_mode) {
                  show_screen(index_screen);
                  display_alert("You can't Access it as a guest. Register, Its Free!");
                  e.stopImmediatePropagation();
                } else {
                  let question =
                    fav[i].parentElement.parentElement.firstChild.innerHTML;
                  if (fav[i].style.color == "red") {
                    //console.log("hey");
                    var user = firebase.auth().currentUser;
                    db.collection("handles")
                      .where("email", "==", user.email)
                      .get()
                      .then((snapshot) => {
                        snapshot.docs.forEach((doc) => {
                          const handle_list = doc.data();
                          if (handle_list.email === user.email) {
                            if (handle_list.bookmarks != undefined) {
                              let array_bookmarks = handle_list.bookmarks;
                              if (array_bookmarks.includes(question)) {
                                for (
                                  let i = 0;
                                  i < array_bookmarks.length;
                                  i++
                                ) {
                                  if (array_bookmarks[i] == question) {
                                    array_bookmarks.splice(i, 1);
                                    break;
                                  }
                                }
                                db.collection("handles").doc(doc.id).update({
                                  email: handle_list.email,
                                  handle: handle_list.handle,
                                  target: handle_list.target,
                                  bookmarks: array_bookmarks,
                                });
                                fav[i].style.color = "white";
                              }
                            } else {
                              display_alert("some error occured removing bookmark");
                              e.stopImmediatePropagation();
                            }
                          }
                        });
                      });
                  } else {
                    fav[i].style.color = "red";

                    //console.log(question);

                    cl++;
                    bookmark_question(question);
                  }
                  // if (cl == 1) {
                }

                //   };
              });
            }
          }
        });
      });
  }
  function string_to_link(str) {
    str = str.split("");
    let ac;
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "0" && str[i] <= "9") {
        ac = str.splice(i, str.length - i);
        break;
      }
    }
    for (let i = 0; i < ac.length; i++) {
      if (ac[i] == "/") {
        ac[i] = "-";
      }
    }
    let bc = "";
    //console.log(ac);
    for (let i = 0; i < ac.length; i++) {
      bc += ac[i];
    }
    return bc;
  }
  function add_listeners_for_favs_wek_str(fav) {
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let array_bookmarks = [];
          const handle_list = doc.data();
          if (handle_list.email === user.email) {
            array_bookmarks = handle_list.bookmarks;
            //console.log(handle_list);
            for (let i = 0; i < fav.length; i++) {
              let questionId = string_to_link(
                fav[i].parentElement.parentElement.firstChild.firstChild.href
              );

              for (let j = 0; j < array_bookmarks.length; j++) {
                if (array_bookmarks[j] == questionId) {
                  //console.log("pppppppppppp");
                  fav[i].style.color = "red";
                }
              }
            }

            for (let i = 0; i < fav.length; i++) {
              //console.log("hey");

              fav[i].addEventListener("click", (e) => {
                e.preventDefault();
                let question = string_to_link(
                  fav[i].parentElement.parentElement.firstChild.firstChild.href
                );
                if (fav[i].style.color == "red") {
                  //console.log("hey");
                  var user = firebase.auth().currentUser;
                  db.collection("handles")
                    .where("email", "==", user.email)
                    .get()
                    .then((snapshot) => {
                      snapshot.docs.forEach((doc) => {
                        const handle_list = doc.data();
                        if (handle_list.email === user.email) {
                          if (handle_list.bookmarks != undefined) {
                            let array_bookmarks = handle_list.bookmarks;
                            if (array_bookmarks.includes(question)) {
                              for (let i = 0; i < array_bookmarks.length; i++) {
                                if (array_bookmarks[i] == question) {
                                  array_bookmarks.splice(i, 1);
                                  break;
                                }
                              }
                              db.collection("handles").doc(doc.id).update({
                                email: handle_list.email,
                                handle: handle_list.handle,
                                target: handle_list.target,
                                bookmarks: array_bookmarks,
                              });
                              fav[i].style.color = "white";
                            }
                          } else {
                            display_alert("some error occured removing bookmark");
                            e.stopImmediatePropagation();
                          }
                        }
                      });
                    });
                } else {
                  fav[i].style.color = "red";

                  //console.log(question);

                  cl++;
                  bookmark_question(question);
                }
                // if (cl == 1) {

                //   };
              });
            }
          }
        });
      });
  }
  document.querySelector(".bookmarked").addEventListener("click", (e) => {
    if (protection_mode) {
      show_screen(index_screen);
      display_alert("You can't Access it as a guest. Register, Its Free!");
      e.stopImmediatePropagation();
    } else {
      db.collection("handles")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            let array_bookmarks = [];
            const handle_list = doc.data();
            if (handle_list.email === user.email) {
              array_bookmarks = handle_list.bookmarks;
              //console.log(handle_list);

              if (array_bookmarks != undefined) {
                //console.log(array_bookmarks);
                display_bookmarks(array_bookmarks);
              }
            }
          });
        });
    }
  });
  function display_bookmarks(array_bookmarks) {
    document.querySelector("#futurecontest").classList.add("hidden");
    document.querySelector("#bookmarkspakd").classList.remove("hidden");
    document.querySelector("#bookmarkspakd").classList.add("animated");
    document.querySelector("#bookmarkspakd").classList.add("bounceInLeft");
    let div_book = document.querySelector(".bookmarked_ques");
    while (div_book.children[0]) {
      div_book.removeChild(div_book.childNodes[0]);
    }
    for (let i = 0; i < array_bookmarks.length; i++) {
      let str = convert_to_link(array_bookmarks[i]);
      let a = document.createElement("tr");
      let th = document.createElement("th");
      th.innerHTML = `<a href="${str}" target="_blank">${array_bookmarks[i]}</a>`;
      a.appendChild(th);
      div_book.appendChild(a);
    }
  }
 function updateHandle()
  {
    $('#exampleModal').modal('show');
    $('.save_new').on('click', ()=>{
      async function achaa(){

        let new_handle=document.getElementById('new_handle').value;
        let modified_url =
          "https://codeforces.com/api/user.info?handles=" + new_handle;
        const jsondata = await fetch(modified_url);
        const jsdata = await jsondata.json();
        if (jsdata.status === "FAILED") {
          display_alert("check your handle again, We can't find it in codeforces database. And also, if codeforces is down!");
        }    
        else{
          db.collection("handles")
            .where("email", "==", user.email)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                const handle_list = doc.data();
                if (handle_list.email === user.email) {
                  db.collection("handles").doc(doc.id).update({
                    handle: new_handle,
                  });
                  document.querySelector(".tr-wr").classList.add("hidden");
                }
              });
            });
        }
      }
      achaa()
    })
  }
}