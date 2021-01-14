let handle = window.location.href.split("=")[1];
const userStatus = "https://codeforces.com/api/user.status?handle=";
const userRating = "https://codeforces.com/api/user.rating?handle=";
var dataPointsRatings = [];
let name = "Abhinandan";
document.querySelector(
  ".greeting"
).innerHTML = `Hey ${handle}! <br> Pleased to see you fresh and ready for this Year!`;
var quesCount = 0;
let array_names=["January", "February", "March", "April", "May", "June", "July","August","September", "October", "November","December"]
//document.querySelector('.greet_number').innerHTML=`You completed 385 questions in 2020. That’s an average of…`
getSetGo();
console.log(handle);
function getSetGo() {
  $(document).ready(function () {
    let map_date = new Map();
    let map_month = new Map();
    for (let i = 1; i <= 31; i++) {
      for (let j = 0; j <= 11; j++) {
        map_date.set(i + "/" + j, 0);
      }
    }
    for (let i = 0; i < 12; i++) {
      map_month.set(i, 0);
    }
    console.log(map_month);
    async function getQuesCount() {
      let newUrl = userStatus + handle;
      const jsonDataQues = await fetch(newUrl);
      const jsDataQues = await jsonDataQues.json();
      let start;
      let tmp_start;
      let end;
      let max_streak = 0;
      let curr_streak = 0;
      let first_date;
      let curr_date;
      let curr_month;
      let ques_on_streak = 0;
      let final_ques_streak = 0;
      let ppp = 0;

      for (let i = 0; i < jsDataQues.result.length; i++) {
        if (
          jsDataQues.result[i].creationTimeSeconds >= 1577836800 &&
          jsDataQues.result[i].creationTimeSeconds <= 1609459199
        ) {
          let unix_timestamp = jsDataQues.result[i].creationTimeSeconds;
          var date = new Date(unix_timestamp * 1000);

          if (jsDataQues.result[i].verdict == "OK") {
            first_date = date;
            quesCount++;
            let cnt = map_date.get(date.getDate() + "/" + date.getMonth());
            map_date.set(date.getDate() + "/" + date.getMonth(), cnt + 1);
            ques_on_streak++;
          }

          if (!ppp) {
            curr_date = date.getDate();
            curr_month = date.getMonth();
            ppp = 1;
            continue;
          }
          // Hours part from the timestamp
          console.log(curr_date, date.getDate());
          if (
            curr_date == date.getDate() + 1 &&
            curr_month == date.getMonth()
          ) {
            if (curr_streak == 0) {
              tmp_start = date.getDate() + "/" + date.getMonth();
              console.log(tmp_start);
            }
            curr_streak++;
          } else if (curr_month == date.getMonth() + 1) {
            let last_date = date.getMonth() % 2 ? 30 : 31;
            if (date.getMonth() == 1) last_date = 29;
            if (date.getDate() == last_date && curr_date == 1) {
              if (curr_streak == 0)
                tmp_start = date.getDate() + "/" + date.getMonth();
              curr_streak++;
            } else {
              if (max_streak < curr_streak) {
                max_streak = curr_streak;
                start = tmp_start;
                end = curr_date + "/" + curr_month;
                final_ques_streak = ques_on_streak;
                ques_on_streak = 0;
              }
              curr_streak = 0;
            }
          } else if(curr_date!=date.getDate()) {
            if (max_streak <= curr_streak) {
              max_streak = curr_streak;
              start = tmp_start;
              end = curr_date + "/" + curr_month;
              final_ques_streak = ques_on_streak;
            }
            ques_on_streak = 0;
            curr_streak = 0;
          }
          curr_date = date.getDate();
          curr_month = date.getMonth();
        }
      }

      let quesDay = (quesCount / 366).toFixed(2);
      let quesWeek = (quesCount / 52).toFixed(2);
      let quesMonth = (quesCount / 12).toFixed(2);
      let cmaxDate = 0;
      let bigDate;
      let day_count=0;
      for (const elem of map_date) {
        map_month.set(
          parseInt(elem[0].split("/")[1]),
          map_month.get(parseInt(elem[0].split("/")[1])) + elem[1]
        );
        if(elem[1])
        day_count++;
        if (cmaxDate < elem[1]) {
          cmaxDate = elem[1];
          bigDate = elem;
        }
      }
      let first_month = first_date.getMonth();
      let max_month = 0;
      let min_month = 10000;
      let best_month;
      let worst_month;
      console.log(map_month);
      console.log(first_month);
      for (const elem of map_month) {
        if (elem[0] >= first_month) {
          if (max_month < elem[1]) {
            max_month = elem[1];
            best_month = elem[0];
          }
        }
      }
      for (const elem of map_month) {
        if (elem[0] >= first_month) {
          console.log(min_month, elem);
          if (min_month > elem[1]) {
            min_month = elem[1];
            worst_month = elem[0];
          }
        }
      }
      console.log(best_month, worst_month);

      let array_date;

      console.log(bigDate);
      document.querySelector(
        ".days_streak"
      ).innerHTML = `${max_streak} days from ${end.split("/")[0]} ${array_names[parseInt(end.split("/")[1])]} to  ${start.split("/")[0]} ${array_names[parseInt(start.split("/")[1])]} `;
      document.querySelector(".date").innerHTML = `${bigDate[0].split("/")[0]} ${array_names[parseInt(bigDate[0].split("/")[1])]}`;
      document.querySelector(
        ".questions_on_best_day"
      ).innerHTML = `${bigDate[1]}`;
      document.querySelector(
        ".greet_number"
      ).innerHTML = `You completed ${quesCount} questions in 2020. That’s an average of…`;
      $(".avg_per_day").text(`${quesDay} questions`);
      $(".avg_per_week").text(`${quesWeek} questions`);
      $(".avg_per_month").text(`${quesMonth} questions`);
      $(".month").text(array_names[best_month]);
      $(".worst_month").text(array_names[worst_month]);
      $(".questions_on_month").text(map_month.get(best_month));
      $(".inactive_days").text(map_month.get(worst_month));
      $(".questions_on_streak").text(final_ques_streak);
      $(".day_count").text(day_count);
      console.log(newUrl);
      console.log(handle);
      console.log(quesCount);
      console.log(quesDay);
      console.log(quesWeek);
      console.log(quesMonth);
      document.querySelector('#tspan5834').textContent=quesCount;
      document.querySelector('#month_best_svg').textContent=array_names[best_month];
      console.clear()
    }

    async function getUserRat() {
      let newUrl = userRating + handle;
      const jsonDataRat = await fetch(newUrl);
      const jsDataRat = await jsonDataRat.json();

      let maxInc = 0;
      let minInc = 100000;
      let maxRat = 0;
      let minRat = 100000;
      let countCont = 0;
      let posCount = 0;
      for (let i = 0; i < jsDataRat.result.length; i++) {
        if (jsDataRat.result[i].ratingUpdateTimeSeconds >= 1577836800 && jsDataRat.result[i].ratingUpdateTimeSeconds <= 1609459199) {
          dataPointsRatings.push({
            x: parseInt(jsDataRat.result[i].ratingUpdateTimeSeconds) * 1000,
					  y: parseInt(jsDataRat.result[i].newRating),
          })
          countCont++;
          if (jsDataRat.result[i].newRating >= jsDataRat.result[i].oldRating) {
            posCount++;
          }
          if (jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating > maxInc) {
            maxInc = jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating;
          }
          if (jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating < minInc) {
            minInc = jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating;
          }
          if (jsDataRat.result[i].newRating > maxRat) {
            maxRat = jsDataRat.result[i].newRating;
          }
          if (jsDataRat.result[i].newRating < minRat) {
            minRat = jsDataRat.result[i].newRating;
          }
        }
      }

      var chart = new CanvasJS.Chart('myChart1', {
				backgroundColor: null,
				animationEnabled: true,
				animationDuration: 2000,
				theme: 'light1',
				title: {
					text: 'Your Ratings',
				},
				data: [
					{
						type: 'splineArea',
						xValueType: 'dateTime',
						dataPoints: dataPointsRatings,
					},
				],
      });
      let posPred = ((posCount * 100) / countCont).toFixed(2);
      $(".rating_pred").html(`| ${maxInc} highest increase | ${minInc} maximum decrease | <br />| Peak: ${maxRat} | Low: ${minRat} |`);
      $(".probability_of_positive").text(`${posPred} %`);
			chart.render();
    }

    getQuesCount();
    getUserRat();
  });
}
