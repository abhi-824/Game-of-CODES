function profile(user_handle) {
  show_screen(profile_screen);
  var dataPointsRatings = [];
  var dataPointsSubmissions = [];
  var dataPointsSubRat = [];
  var dataPointsSubRatOK = [];
  var ok = 0;
  var compilationError = 0;
  var runTimeError = 0;
  var wrongAnswer = 0;
  var timeLimitExceeded = 0;
  var memoryLimitExceeded = 0;
  var others = 0;
  var probRat1199 = 0;
  var probRat1200_1599 = 0;
  var probRat1600_1999 = 0;
  var probRat2000_2399 = 0;
  var probRat2400_2799 = 0;
  var probRat2800 = 0;
  var okProbRat1199 = 0;
  var okProbRat1200_1599 = 0;
  var okProbRat1600_1999 = 0;
  var okProbRat2000_2399 = 0;
  var okProbRat2400_2799 = 0;
  var okProbRat2800 = 0;
  const urlRatings = "https://codeforces.com/api/user.rating?handle=";
  const urlSubmissions = "https://codeforces.com/api/user.status?handle=";
  const urlUserAvatar = "https://codeforces.com/api/user.info?handles=";

  let success_no;
  let solve = new Set();
  let all_top_name = [
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
  let top_map = new Map();
  let weak_top = [];
  let strong_top = [];

  $(".username").text(user_handle);

  $(document).ready(function () {
    async function getUserRatings() {
      let finalUrlRatings = urlRatings + user_handle;

      const jsonDataRatings = await fetch(finalUrlRatings);
      const jsDataRatings = await jsonDataRatings.json();

      for (let i = 0; i < jsDataRatings.result.length; i++) {
        dataPointsRatings.push({
          x: parseInt(jsDataRatings.result[i].ratingUpdateTimeSeconds) * 1000,
          y: parseInt(jsDataRatings.result[i].newRating),
        });
      }

      var chart = new CanvasJS.Chart("myChart1", {
        backgroundColor: null,
        animationEnabled: true,
        animationDuration: 2000,
        theme: "dark1",
        title: {
          text: "Your Ratings",
        },
        data: [
          {
            type: "line",
            xValueType: "dateTime",
            dataPoints: dataPointsRatings,
          },
        ],
      });

      chart.render();
      //console.log(dataPointsRatings);
    }

    async function getUserSubmissions() {
      let finalUrlSubmissions = urlSubmissions + user_handle + "&from=1";

      const jsonDataSubmissions = await fetch(finalUrlSubmissions);
      const jsDataSubmissions = await jsonDataSubmissions.json();

      total_attempts = jsDataSubmissions.result.length;

      for (let j = 0; j < jsDataSubmissions.result.length; j++) {
        if (jsDataSubmissions.result[j].verdict == "OK") {
          ok++;
        } else if (jsDataSubmissions.result[j].verdict == "COMPILATION_ERROR") {
          compilationError++;
        } else if (jsDataSubmissions.result[j].verdict == "RUNTIME_ERROR") {
          runTimeError++;
        } else if (jsDataSubmissions.result[j].verdict == "WRONG_ANSWER") {
          wrongAnswer++;
        } else if (
          jsDataSubmissions.result[j].verdict == "TIME_LIMIT_EXCEEDED"
        ) {
          timeLimitExceeded++;
        } else if (
          jsDataSubmissions.result[j].verdict == "MEMORY_LIMIT_EXCEEDED"
        ) {
          memoryLimitExceeded++;
        } else {
          others++;
        }
      }

      //console.log(ok, total_attempts);
      accuracy_rate = ((ok / total_attempts) * 100).toFixed(2);
      document.querySelector("#submissions").textContent = "SUBMISSIONS: " + ok;
      document.querySelector("#acc_rate").textContent =
        "ACCURACY RATE: " + accuracy_rate + "%";

      dataPointsSubmissions.push({
        y: ok,
        indexLabel: "OK",
      });
      dataPointsSubmissions.push({
        y: compilationError,
        indexLabel: "COMPILATION_ERROR",
      });
      dataPointsSubmissions.push({
        y: runTimeError,
        indexLabel: "RUNTIME_ERROR",
      });
      dataPointsSubmissions.push({
        y: wrongAnswer,
        indexLabel: "WRONG_ANSWER",
      });
      dataPointsSubmissions.push({
        y: timeLimitExceeded,
        indexLabel: "TIME_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions.push({
        y: memoryLimitExceeded,
        indexLabel: "MEMORY_LIMIT_EXCEEDED",
      });
      dataPointsSubmissions.push({
        y: others,
        indexLabel: "OTHERS",
      });

      var chart = new CanvasJS.Chart("myChart2", {
        theme: "dark2",
        backgroundColor: null,
        animationEnabled: true,
        animationDuration: 2000,
        title: {
          text: "Your Submissions",
        },
        data: [
          {
            type: "pie",
            showInLegend: true,
            toolTipContent: "{y} - #percent %",
            yValueFormatString: "",
            legendText: "{indexLabel}",
            dataPoints: dataPointsSubmissions,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubmissions);
    }

    async function getUserSubRat() {
      let finalUserSubRat = urlSubmissions + user_handle + "&from=1";

      const jsonDataSubRat = await fetch(finalUserSubRat);
      const jsDataSubRat = await jsonDataSubRat.json();

      for (let k = 0; k < jsDataSubRat.result.length; k++) {
        if (jsDataSubRat.result[k].problem.rating < 1200) {
          probRat1199++;
        } else if (
          jsDataSubRat.result[k].problem.rating > 1199 &&
          jsDataSubRat.result[k].problem.rating < 1600
        ) {
          probRat1200_1599++;
        } else if (
          jsDataSubRat.result[k].problem.rating > 1599 &&
          jsDataSubRat.result[k].problem.rating < 2000
        ) {
          probRat1600_1999++;
        } else if (
          jsDataSubRat.result[k].problem.rating > 1999 &&
          jsDataSubRat.result[k].problem.rating < 2400
        ) {
          probRat2000_2399++;
        } else if (
          jsDataSubRat.result[k].problem.rating > 2399 &&
          jsDataSubRat.result[k].problem.rating < 2800
        ) {
          probRat2400_2799++;
        } else if (jsDataSubRat.result[k].problem.rating > 2799) {
          probRat2800++;
        }
      }

      dataPointsSubRat.push({
        x: 1,
        y: probRat1199,
        label: "<1200",
      });
      dataPointsSubRat.push({
        x: 2,
        y: probRat1200_1599,
        label: "1200-1599",
      });
      dataPointsSubRat.push({
        x: 3,
        y: probRat1600_1999,
        label: "1600-1999",
      });
      dataPointsSubRat.push({
        x: 4,
        y: probRat2000_2399,
        label: "2000-2399",
      });
      dataPointsSubRat.push({
        x: 5,
        y: probRat2400_2799,
        label: "2400-2799",
      });
      dataPointsSubRat.push({
        x: 6,
        y: probRat2800,
        label: ">2800",
      });

      var chart = new CanvasJS.Chart("myChart3", {
        backgroundColor: null,
        theme: "dark2",
        animationEnabled: true,
        title: {
          text: "Your Problem-Rating-Wise All Submissions",
        },
        data: [
          {
            type: "column",
            dataPoints: dataPointsSubRat,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubRat);
    }

    async function getUserSubRatOK() {
      let finalUserSubRatOK = urlSubmissions + user_handle + "&from=1";

      const jsonDataSubRatOK = await fetch(finalUserSubRatOK);
      const jsDataSubRatOK = await jsonDataSubRatOK.json();

      for (let k = 0; k < jsDataSubRatOK.result.length; k++) {
        if (jsDataSubRatOK.result[k].verdict == "OK") {
          if (jsDataSubRatOK.result[k].problem.rating < 1200) {
            okProbRat1199++;
          } else if (
            jsDataSubRatOK.result[k].problem.rating > 1199 &&
            jsDataSubRatOK.result[k].problem.rating < 1600
          ) {
            okProbRat1200_1599++;
          } else if (
            jsDataSubRatOK.result[k].problem.rating > 1599 &&
            jsDataSubRatOK.result[k].problem.rating < 2000
          ) {
            okProbRat1600_1999++;
          } else if (
            jsDataSubRatOK.result[k].problem.rating > 1999 &&
            jsDataSubRatOK.result[k].problem.rating < 2400
          ) {
            okProbRat2000_2399++;
          } else if (
            jsDataSubRatOK.result[k].problem.rating > 2399 &&
            jsDataSubRatOK.result[k].problem.rating < 2800
          ) {
            okProbRat2400_2799++;
          } else if (jsDataSubRatOK.result[k].problem.rating > 2799) {
            okProbRat2800++;
          }
        }
      }

      dataPointsSubRatOK.push({
        x: 1,
        y: okProbRat1199,
        label: "<1200",
      });
      dataPointsSubRatOK.push({
        x: 2,
        y: okProbRat1200_1599,
        label: "1200-1599",
      });
      dataPointsSubRatOK.push({
        x: 3,
        y: okProbRat1600_1999,
        label: "1600-1999",
      });
      dataPointsSubRatOK.push({
        x: 4,
        y: okProbRat2000_2399,
        label: "2000-2399",
      });
      dataPointsSubRatOK.push({
        x: 5,
        y: okProbRat2400_2799,
        label: "2400-2799",
      });
      dataPointsSubRatOK.push({
        x: 6,
        y: okProbRat2800,
        label: ">2800",
      });
      var chart = new CanvasJS.Chart("myChart4", {
        backgroundColor: null,
        theme: "dark2",
        animationEnabled: true,
        title: {
          text: "Your Problem-Rating-Wise Accepted Submissions",
        },
        data: [
          {
            type: "column",
            dataPoints: dataPointsSubRatOK,
          },
        ],
      });
      chart.render();
      //console.log(dataPointsSubRatOK);
    }

    async function getUserAvatar() {
      let finalUserAvatarUrl = urlUserAvatar + user_handle;

      const jsonDataAvatar = await fetch(finalUserAvatarUrl);
      const jsDataAvatar = await jsonDataAvatar.json();
      let userPhoto = jsDataAvatar.result[0].titlePhoto;
      let temp = "";
      let tempArr = [temp, userPhoto];
      let finalPhoto = tempArr.join("");
      $("#profile-photo").attr("src", finalPhoto);
      user_rating = jsDataAvatar.result[0].rating;
      max_rating = jsDataAvatar.result[0].maxRating;
      user_rank = jsDataAvatar.result[0].rank;
      max_rank = jsDataAvatar.result[0].maxRank;
      //console.log("Current-Rating: "+ user_rating + ", Max-Rating: " + max_rating);
      document.querySelector("#cur_rating").textContent =
        "CURRENT RATING: " + user_rating;
      document.querySelector("#max_rating").textContent =
        "BEST RATING: " + max_rating;
      document.querySelector("#cur_rank").textContent =
        "CURRENT RANK: " + user_rank;
      document.querySelector("#max_rank").textContent =
        "BEST RANK: " + max_rank;
    }

    async function getTopics() {
      let urlTop = urlSubmissions + user_handle;

      const jsonTop = await fetch(urlTop);
      const jsTop = await jsonTop.json();

      let unsolve = new Set();

      unsolve.clear();
      solve.clear();

      for (let i = 0; i < all_top_name.length; i++) {
        top_map.set(all_top_name[i], 0);
      }
      let jj = 0;

      for (let i = 0; i < jsTop.result.length; i++) {
        if (jsTop.result[i].verdict == "OK") {
          let str =
            jsTop.result[i].problem.contestId +
            "-" +
            jsTop.result[i].problem.index;
          solve.add(str);
          success_no = solve.size;
        }
      }

      for (let i = 0; i < jsTop.result.length; i++) {
        if (jsTop.result[i].verdict == "OK") {
          let tags = jsTop.result[i].problem.tags;

          if (jsTop.result[i].problem.rating > 1400) {
            for (let i = 0; i < tags.length; i++) {
              jj = top_map.get(tags[i]);
              if (jsTop.result[i].problem.rating != undefined) {
                jj = jj + jsTop.result[i].problem.rating / 1000;
              }
              top_map.set(tags[i], jj + 1);
            }
          } else {
            for (let i = 0; i < tags.length; i++) {
              jj = top_map.get(tags[i]);
              top_map.set(tags[i], jj + 0.5);
            }
          }
        } else {
          let tags = jsTop.result[i].problem.tags;
          for (let i = 0; i < tags.length; i++) {
            jj = top_map.get(tags[i]);

            top_map.set(tags[i], jj - 0.35);
          }
        }
      }

      let sum = 0;
      let no2 = 0;

      for (let i of top_map.values()) {
        if (i > 0) {
          sum += i;
          no2 += 1;
        }
      }

      let avg = sum / no2;

      for (let i of top_map) {
        if (i[1] < avg) {
          weak_top.push(i[0]);
        } else {
          strong_top.push(i[0]);
        }
      }

      let tbw = document.querySelector(".weak_top_pro");
      //console.log(weak_top);
      for (let i = 0; i < weak_top.length; i++) {
        let trw = document.createElement("tr");
        let thw = document.createElement("th");
        thw.innerHTML = weak_top[i];

        trw.appendChild(thw);
        tbw.appendChild(trw);
      }

      let tbs = document.querySelector(".strong_top_pro");
      for (let i = 0; i < strong_top.length; i++) {
        let trs = document.createElement("tr");
        let ths = document.createElement("th");
        ths.innerHTML = strong_top[i];
        trs.appendChild(ths);
        tbs.appendChild(trs);
      }
    }

    getUserAvatar();
    
    setTimeout(getUserRatings, 1000);
    setTimeout(getUserSubmissions, 5000);
    setTimeout(getUserSubRat, 10000);
    getUserSubRatOK();
    setTimeout(getTopics, 16000);
  });

  // window.onload = /	/console.log('hello');
}
