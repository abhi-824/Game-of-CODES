function compare_final(handle_name, handle_name2) {
  let user_submissions;
  let weak_topics = document.querySelector(".weak_topics_comp");
  let no_of_success;
  let strong_topics = document.querySelector(".strong_topics_comp");
  let unsolved_problems = new Set();
  let unsolved_problems_array = [];
  let user_contests = "https://codeforces.com/api/user.rating?handle=";
  let api_url = "https://codeforces.com/api/";
  const url_info = " https://codeforces.com/api/user.info?handles=";
  const url2 = "https://codeforces.com/api/user.status?handle=";
  let solved = new Set();
  let user_contest = [];
  var load_kk = document.querySelector(".load-kro");

  window.addEventListener("load", function () {
    load_kk.classList.add("disapper");
  });
  // for charts
  var dataPointsRatings1 = [];
  var dataPointsRatings2 = [];
  var dataPointsSubRat1 = [];
  var dataPointsSubRat2 = [];
  var dataPointsSubmissions1 = [];
  var dataPointsSubmissions2 = [];
  var dataPointsSubRatOK1 = [];
  var dataPointsSubRatOK2 = [];
  var probRat1199U1 = 0;
  var probRat1200_1599U1 = 0;
  var probRat1600_1999U1 = 0;
  var probRat2000_2399U1 = 0;
  var probRat2400_2799U1 = 0;
  var probRat2800U1 = 0;
  var probRat1199U2 = 0;
  var probRat1200_1599U2 = 0;
  var probRat1600_1999U2 = 0;
  var probRat2000_2399U2 = 0;
  var probRat2400_2799U2 = 0;
  var probRat2800U2 = 0;
  var ok1 = 0;
  var compilationError1 = 0;
  var runTimeError1 = 0;
  var wrongAnswer1 = 0;
  var timeLimitExceeded1 = 0;
  var memoryLimitExceeded1 = 0;
  var others1 = 0;
  var ok2 = 0;
  var compilationError2 = 0;
  var runTimeError2 = 0;
  var wrongAnswer2 = 0;
  var timeLimitExceeded2 = 0;
  var memoryLimitExceeded2 = 0;
  var others2 = 0;
  var okProbRat1199U1 = 0;
  var okProbRat1200_1599U1 = 0;
  var okProbRat1600_1999U1 = 0;
  var okProbRat2000_2399U1 = 0;
  var okProbRat2400_2799U1 = 0;
  var okProbRat2800U1 = 0;
  var okProbRat1199U2 = 0;
  var okProbRat1200_1599U2 = 0;
  var okProbRat1600_1999U2 = 0;
  var okProbRat2000_2399U2 = 0;
  var okProbRat2400_2799U2 = 0;
  var okProbRat2800U2 = 0;

  //   for the starting comparison     //
  var curRank1;
  var curRank2;
  var maxRank1;
  var maxRank2;
  var curRating1;
  var curRating2;
  var maxRating1;
  var maxRating2;
  var numOfContest1;
  var numOfContest2;

  google.charts.load("current", {
    packages: ["corechart"],
  });

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

  //console.log(handle_name)
  //console.log(handle_name2)
  document.querySelector(".handle1").innerHTML = handle_name;
  document.querySelector(".handle2").innerHTML = handle_name2;
  document.querySelector(".handle_1").innerHTML = handle_name;
  document.querySelector(".handle_2").innerHTML = handle_name2;

  $(document).ready(function () {
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

      let tb = document.querySelector(".weak_topicss_comp");
      //console.log(weak_topicss);
      for (let i = 0; i < weak_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = weak_topicss[i];

        tr.appendChild(th1);
        tb.appendChild(tr);
      }

      let tb1 = document.querySelector(".strong_topicss_comp");
      for (let i = 0; i < strong_topicss.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = strong_topicss[i];
        tr.appendChild(th1);
        tb1.appendChild(tr);
      }
    }
    //getsubmissions();

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

      let tb = document.querySelector(".weak_topicss2_comp");
      //console.log(weak_topicss2);
      for (let i = 0; i < weak_topicss2.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = weak_topicss2[i];

        tr.appendChild(th1);
        tb.appendChild(tr);
      }

      let tb1 = document.querySelector(".strong_topicss2_comp");
      for (let i = 0; i < strong_topicss2.length; i++) {
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerHTML = strong_topicss2[i];
        tr.appendChild(th1);
        tb1.appendChild(tr);
      }
    }
    //getsubmissions2();

    // ------------ for charts ------- //
    async function getUserRatingsCompare() {
      let userRatings1 = user_contests + handle_name;

      const jsonDataRatings1 = await fetch(userRatings1);
      const jsDataRatings1 = await jsonDataRatings1.json();

      for (let i = 0; i < jsDataRatings1.result.length; i++) {
        dataPointsRatings1.push({
          x: parseInt(jsDataRatings1.result[i].ratingUpdateTimeSeconds) * 1000,
          y: parseInt(jsDataRatings1.result[i].newRating),
        });
      }

      numOfContest1 = jsDataRatings1.result.length;
      //console.log(numOfContest1);

      let userRatings2 = user_contests + handle_name2;

      const jsonDataRatings2 = await fetch(userRatings2);
      const jsDataRatings2 = await jsonDataRatings2.json();

      for (let i = 0; i < jsDataRatings2.result.length; i++) {
        dataPointsRatings2.push({
          x: parseInt(jsDataRatings2.result[i].ratingUpdateTimeSeconds) * 1000,
          y: parseInt(jsDataRatings2.result[i].newRating),
        });
      }

      numOfContest2 = jsDataRatings2.result.length;
      //console.log(numOfContest2);

      var chart = new CanvasJS.Chart("compareChart1", {
        zoomEnabled: true,
        animationEnabled: true,
        animationDuration: 2000,
        theme: "dark1",
        backgroundColor: null,
        title: {
          text: "Compare Your Ratings!",
        },
        legend: {
          fontSize: 20,
        },
        data: [
          {
            type: "line",
            showInLegend: true,
            legendText: handle_name,
            xValueType: "dateTime",
            dataPoints: dataPointsRatings1,
          },
          {
            type: "line",
            showInLegend: true,
            legendText: handle_name2,
            xValueType: "dateTime",
            dataPoints: dataPointsRatings2,
          },
        ],
      });

      chart.render();
      //console.log(dataPointsRatings1);
      //console.log(dataPointsRatings2);
    }

    async function getUserSubRatCompare() {
      let userSubRat1 = url2 + handle_name + "&from=1";

      const jsonDataSubRat1 = await fetch(userSubRat1);
      const jsDataSubRat1 = await jsonDataSubRat1.json();

      for (let k = 0; k < jsDataSubRat1.result.length; k++) {
        if (jsDataSubRat1.result[k].problem.rating < 1200) {
          probRat1199U1++;
        } else if (
          jsDataSubRat1.result[k].problem.rating > 1199 &&
          jsDataSubRat1.result[k].problem.rating < 1600
        ) {
          probRat1200_1599U1++;
        } else if (
          jsDataSubRat1.result[k].problem.rating > 1599 &&
          jsDataSubRat1.result[k].problem.rating < 2000
        ) {
          probRat1600_1999U1++;
        } else if (
          jsDataSubRat1.result[k].problem.rating > 1999 &&
          jsDataSubRat1.result[k].problem.rating < 2400
        ) {
          probRat2000_2399U1++;
        } else if (
          jsDataSubRat1.result[k].problem.rating > 2399 &&
          jsDataSubRat1.result[k].problem.rating < 2800
        ) {
          probRat2400_2799U1++;
        } else if (jsDataSubRat1.result[k].problem.rating > 2799) {
          probRat2800U1++;
        }
        if (jsDataSubRat1.result[k].verdict == "OK") {
          ok1++;
        } else if (jsDataSubRat1.result[k].verdict == "COMPILATION_ERROR") {
          compilationError1++;
        } else if (jsDataSubRat1.result[k].verdict == "RUNTIME_ERROR") {
          runTimeError1++;
        } else if (jsDataSubRat1.result[k].verdict == "WRONG_ANSWER") {
          wrongAnswer1++;
        } else if (jsDataSubRat1.result[k].verdict == "TIME_LIMIT_EXCEEDED") {
          timeLimitExceeded1++;
        } else if (jsDataSubRat1.result[k].verdict == "MEMORY_LIMIT_EXCEEDED") {
          memoryLimitExceeded1++;
        } else {
          others1++;
        }
      }

      dataPointsSubRat1.push({
        x: 1,
        y: probRat1199U1,
        label: "<1200",
      });
      dataPointsSubRat1.push({
        x: 2,
        y: probRat1200_1599U1,
        label: "1200-1599",
      });
      dataPointsSubRat1.push({
        x: 3,
        y: probRat1600_1999U1,
        label: "1600-1999",
      });
      dataPointsSubRat1.push({
        x: 4,
        y: probRat2000_2399U1,
        label: "2000-2399",
      });
      dataPointsSubRat1.push({
        x: 5,
        y: probRat2400_2799U1,
        label: "2400-2799",
      });
      dataPointsSubRat1.push({
        x: 6,
        y: probRat2800U1,
        label: ">2800",
      });

      dataPointsSubmissions1.push({
        x: 1,
        y: ok1,
        label: "OK",
      });
      dataPointsSubmissions1.push({
        x: 2,
        y: compilationError1,
        label: "COMPILATION_ERROR",
      });
      dataPointsSubmissions1.push({
        x: 3,
        y: runTimeError1,
        label: "RUNTIME_ERROR",
      });
      dataPointsSubmissions1.push({
        x: 4,
        y: wrongAnswer1,
        label: "WRONG_ANSWER",
      });
      dataPointsSubmissions1.push({
        x: 5,
        y: timeLimitExceeded1,
        label: "TIME_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions1.push({
        x: 6,
        y: memoryLimitExceeded1,
        label: "MEMORY_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions1.push({
        x: 7,
        y: others1,
        label: "OTHERS",
      });

      let userSubRat2 = url2 + handle_name2 + "&from=1";

      const jsonDataSubRat2 = await fetch(userSubRat2);
      const jsDataSubRat2 = await jsonDataSubRat2.json();

      for (let k = 0; k < jsDataSubRat2.result.length; k++) {
        if (jsDataSubRat2.result[k].problem.rating < 1200) {
          probRat1199U2++;
        } else if (
          jsDataSubRat2.result[k].problem.rating > 1199 &&
          jsDataSubRat2.result[k].problem.rating < 1600
        ) {
          probRat1200_1599U2++;
        } else if (
          jsDataSubRat2.result[k].problem.rating > 1599 &&
          jsDataSubRat2.result[k].problem.rating < 2000
        ) {
          probRat1600_1999U2++;
        } else if (
          jsDataSubRat2.result[k].problem.rating > 1999 &&
          jsDataSubRat2.result[k].problem.rating < 2400
        ) {
          probRat2000_2399U2++;
        } else if (
          jsDataSubRat2.result[k].problem.rating > 2399 &&
          jsDataSubRat2.result[k].problem.rating < 2800
        ) {
          probRat2400_2799U2++;
        } else if (jsDataSubRat2.result[k].problem.rating > 2799) {
          probRat2800U2++;
        }
        if (jsDataSubRat2.result[k].verdict == "OK") {
          ok2++;
        } else if (jsDataSubRat2.result[k].verdict == "COMPILATION_ERROR") {
          compilationError2++;
        } else if (jsDataSubRat2.result[k].verdict == "RUNTIME_ERROR") {
          runTimeError2++;
        } else if (jsDataSubRat2.result[k].verdict == "WRONG_ANSWER") {
          wrongAnswer2++;
        } else if (jsDataSubRat2.result[k].verdict == "TIME_LIMIT_EXCEEDED") {
          timeLimitExceeded2++;
        } else if (jsDataSubRat2.result[k].verdict == "MEMORY_LIMIT_EXCEEDED") {
          memoryLimitExceeded2++;
        } else {
          others2++;
        }
      }

      dataPointsSubRat2.push({
        x: 1,
        y: probRat1199U2,
        label: "<1200",
      });
      dataPointsSubRat2.push({
        x: 2,
        y: probRat1200_1599U2,
        label: "1200-1599",
      });
      dataPointsSubRat2.push({
        x: 3,
        y: probRat1600_1999U2,
        label: "1600-1999",
      });
      dataPointsSubRat2.push({
        x: 4,
        y: probRat2000_2399U2,
        label: "2000-2399",
      });
      dataPointsSubRat2.push({
        x: 5,
        y: probRat2400_2799U2,
        label: "2400-2799",
      });
      dataPointsSubRat2.push({
        x: 6,
        y: probRat2800U2,
        label: ">2800",
      });

      dataPointsSubmissions2.push({
        x: 1,
        y: ok2,
        label: "OK",
      });
      dataPointsSubmissions2.push({
        x: 2,
        y: compilationError2,
        label: "COMPILATION_ERROR",
      });
      dataPointsSubmissions2.push({
        x: 3,
        y: runTimeError2,
        label: "RUNTIME_ERROR",
      });
      dataPointsSubmissions2.push({
        x: 4,
        y: wrongAnswer2,
        label: "WRONG_ANSWER",
      });
      dataPointsSubmissions2.push({
        x: 5,
        y: timeLimitExceeded2,
        label: "TIME_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions2.push({
        x: 6,
        y: memoryLimitExceeded2,
        label: "MEMORY_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions2.push({
        x: 7,
        y: others2,
        label: "OTHERS",
      });

      var chart = new CanvasJS.Chart("compareChart2", {
        theme: "dark2",
        backgroundColor: null,
        animationEnabled: true,
        title: {
          text: " Compare Your Problem-Rating-Wise All Submissions!",
        },
        data: [
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name,
            dataPoints: dataPointsSubRat1,
          },
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name2,
            dataPoints: dataPointsSubRat2,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubRat1);
      //console.log(dataPointsSubRat2);

      var chart = new CanvasJS.Chart("compareChart3", {
        theme: "dark2",
        animationEnabled: true,
        backgroundColor: null,
        animationDuration: 2000,
        title: {
          text: "Compare Your Submissions!",
        },
        data: [
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name,
            dataPoints: dataPointsSubmissions1,
          },
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name2,
            dataPoints: dataPointsSubmissions2,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubmissions1);
      //console.log(dataPointsSubmissions2);
      $(".ok1").text(ok1);
      $(".ok2").text(ok2);
    }

    async function startCompare() {
      let userInfo1 = url_info + handle_name;

      const jsonDataStart1 = await fetch(userInfo1);
      const jsDataStart1 = await jsonDataStart1.json();

      curRank1 = jsDataStart1.result[0].rank;
      maxRank1 = jsDataStart1.result[0].maxRank;
      curRating1 = jsDataStart1.result[0].rating;
      maxRating1 = jsDataStart1.result[0].maxRating;

      let userInfo2 = url_info + handle_name2;

      const jsonDataStart2 = await fetch(userInfo2);
      const jsDataStart2 = await jsonDataStart2.json();

      curRank2 = jsDataStart2.result[0].rank;
      maxRank2 = jsDataStart2.result[0].maxRank;
      curRating2 = jsDataStart2.result[0].rating;
      maxRating2 = jsDataStart2.result[0].maxRating;

      $(".Handle1").text(handle_name);
      $(".Handle2").text(handle_name2);
      $(".curRank1").text(curRank1);
      $(".curRank2").text(curRank2);
      $(".maxRank1").text(maxRank1);
      $(".maxRank2").text(maxRank2);
      $(".curRating1").text(curRating1);
      $(".curRating2").text(curRating2);
      $(".maxRating1").text(maxRating1);
      $(".maxRating2").text(maxRating2);
      $(".numOfContest1").text(numOfContest1);
      $(".numOfContest2").text(numOfContest2);
    }

    async function getUserSubRatOK() {
      let userSubRatOK1 = url2 + handle_name + "&from=1";

      const jsonSubRatOK1 = await fetch(userSubRatOK1);
      const jsSubRatOK1 = await jsonSubRatOK1.json();

      for (let k = 0; k < jsSubRatOK1.result.length; k++) {
        if (jsSubRatOK1.result[k].verdict == "OK") {
          if (jsSubRatOK1.result[k].problem.rating < 1200) {
            okProbRat1199U1++;
          } else if (
            jsSubRatOK1.result[k].problem.rating > 1199 &&
            jsSubRatOK1.result[k].problem.rating < 1600
          ) {
            okProbRat1200_1599U1++;
          } else if (
            jsSubRatOK1.result[k].problem.rating > 1599 &&
            jsSubRatOK1.result[k].problem.rating < 2000
          ) {
            okProbRat1600_1999U1++;
          } else if (
            jsSubRatOK1.result[k].problem.rating > 1999 &&
            jsSubRatOK1.result[k].problem.rating < 2400
          ) {
            okProbRat2000_2399U1++;
          } else if (
            jsSubRatOK1.result[k].problem.rating > 2399 &&
            jsSubRatOK1.result[k].problem.rating < 2800
          ) {
            okProbRat2400_2799U1++;
          } else if (jsSubRatOK1.result[k].problem.rating > 2799) {
            okProbRat2800U1++;
          }
        }
      }

      dataPointsSubRatOK1.push({
        x: 1,
        y: okProbRat1199U1,
        label: "<1200",
      });
      dataPointsSubRatOK1.push({
        x: 2,
        y: okProbRat1200_1599U1,
        label: "1200-1599",
      });
      dataPointsSubRatOK1.push({
        x: 3,
        y: okProbRat1600_1999U1,
        label: "1600-1999",
      });
      dataPointsSubRatOK1.push({
        x: 4,
        y: okProbRat2000_2399U1,
        label: "2000-2399",
      });
      dataPointsSubRatOK1.push({
        x: 5,
        y: okProbRat2400_2799U1,
        label: "2400-2799",
      });
      dataPointsSubRatOK1.push({
        x: 6,
        y: okProbRat2800U1,
        label: ">2800",
      });

      let userSubRatOK2 = url2 + handle_name2 + "&from=1";

      const jsonSubRatOK2 = await fetch(userSubRatOK2);
      const jsSubRatOK2 = await jsonSubRatOK2.json();

      for (let k = 0; k < jsSubRatOK2.result.length; k++) {
        if (jsSubRatOK2.result[k].verdict == "OK") {
          if (jsSubRatOK2.result[k].problem.rating < 1200) {
            okProbRat1199U2++;
          } else if (
            jsSubRatOK2.result[k].problem.rating > 1199 &&
            jsSubRatOK2.result[k].problem.rating < 1600
          ) {
            okProbRat1200_1599U2++;
          } else if (
            jsSubRatOK2.result[k].problem.rating > 1599 &&
            jsSubRatOK2.result[k].problem.rating < 2000
          ) {
            okProbRat1600_1999U2++;
          } else if (
            jsSubRatOK2.result[k].problem.rating > 1999 &&
            jsSubRatOK2.result[k].problem.rating < 2400
          ) {
            okProbRat2000_2399U2++;
          } else if (
            jsSubRatOK2.result[k].problem.rating > 2399 &&
            jsSubRatOK2.result[k].problem.rating < 2800
          ) {
            okProbRat2400_2799U2++;
          } else if (jsSubRatOK2.result[k].problem.rating > 2799) {
            okProbRat2800U2++;
          }
        }
      }

      dataPointsSubRatOK2.push({
        x: 1,
        y: okProbRat1199U2,
        label: "<1200",
      });
      dataPointsSubRatOK2.push({
        x: 2,
        y: okProbRat1200_1599U2,
        label: "1200-1599",
      });
      dataPointsSubRatOK2.push({
        x: 3,
        y: okProbRat1600_1999U2,
        label: "1600-1999",
      });
      dataPointsSubRatOK2.push({
        x: 4,
        y: okProbRat2000_2399U2,
        label: "2000-2399",
      });
      dataPointsSubRatOK2.push({
        x: 5,
        y: okProbRat2400_2799U2,
        label: "2400-2799",
      });
      dataPointsSubRatOK2.push({
        x: 6,
        y: okProbRat2800U2,
        label: ">2800",
      });

      var chart = new CanvasJS.Chart("compareChart4", {
        theme: "dark2",
        animationEnabled: true,
        backgroundColor: null,
        animationDuration: 2000,
        title: {
          text: "Compare Your Problem-Rating-Wise Accepted Submissions!",
        },
        data: [
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name,
            dataPoints: dataPointsSubRatOK1,
          },
          {
            type: "column",
            showInLegend: true,
            legendText: handle_name2,
            dataPoints: dataPointsSubRatOK2,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubRatOK1);
      //console.log(dataPointsSubRatOK2);
    }

    getUserRatingsCompare();
    getUserSubRatCompare();
    setTimeout(startCompare, 2000);
    setTimeout(getsubmissions, 5000);
    setTimeout(getsubmissions2, 10000);
    setTimeout(getUserSubRatOK, 14000);
  });
}
