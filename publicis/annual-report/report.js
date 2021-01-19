let handle = window.location.href.split("=")[1];
const userStatus = "https://codeforces.com/api/user.status?handle=";
const userRating = "https://codeforces.com/api/user.rating?handle=";
let papp = 0;
var dataPointsRatings = [];
var heatmap = new Map();
let badges_missed = new Set();

let name = "Abhinandan";
document.querySelector(
  ".greeting"
).innerHTML = `Hey ${handle}! <br> Pleased to see you fresh and ready for this Year!`;
var quesCount = 0;
let array_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
document
  .querySelector(".facebook_btn")
  .setAttribute(
    "href",
    `https://www.facebook.com/sharer/sharer.php?t=&u=${window.location.href}`
  );
  document
  .querySelector(".linkedin_btn")
  .setAttribute(
    "href",
    `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`
  );
// document.querySelector(".linkedin_btn").addEventListener("click",(e) => {
//   var copyText = window.location.href;
//   let div=document.createElement("textarea");
//   div.value=copyText;
//   // div.style.display="none";
//   div.id="ajajaj";
//   document.body.appendChild(div);
//   //console.log(copyText);
//   /* Select the text field */
//   document.getElementById("ajajaj").select();


//   /* Copy the text inside the text field */
//   document.execCommand("copy");

//   /* Alert the copied text */
//   alert("Copied the url. You can now manually go to linkedin and paste the link there. We tried a lot but couldn't find a way to redirect you to linkedin post.😫");
//   div.style.display="none";

// });
document
  .querySelector(".twitter_btn")
  .setAttribute(
    "href",
    `https://twitter.com/intent/tweet?text=Here’s my %40codeforces Year in Review 2020! Get a glimpse into my competitive journey over the last twelve months. ${window.location.href}`
  );
//document.querySelector('.greet_number').innerHTML=`You completed 385 questions in 2020. That’s an average of…`
getSetGo();
////console.log(handle);
document.querySelector(".loader").classList.remove("hidden");
document.body.style = "overflow-y:hidden;";
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
    ////console.log(map_month);
    let tot_rating_points = 0;
    async function getQuesCount() {
      let newUrl = userStatus + handle;
      const jsonDataQues = await fetch(newUrl);
      const jsDataQues = await jsonDataQues.json();
      
      let start;
      let tmp_start;
      let end;
      let max_streak = 0;
      let accuracy = 0;
      let correct_answer = 0;
      let wrong_answer = 0;
      let curr_streak = 0;
      let first_date;
      let curr_date;
      let curr_month;
      let ques_on_streak = 0;
      let final_ques_streak = 0;
      let ppp = 0;
      let curr_rating_points_per_date = 0;
      let curr_date_badge;
      let curr_date_month;
      let firstTime = 1;
      let max_rating_points_per_date = 0;
      for (let i = 0; i < jsDataQues.result.length; i++) {
        if (
          jsDataQues.result[i].creationTimeSeconds >= 1577836800 &&
          jsDataQues.result[i].creationTimeSeconds <= 1609459199
        ) {
          let unix_timestamp = jsDataQues.result[i].creationTimeSeconds;
          var date = new Date(unix_timestamp * 1000);
          
          if (jsDataQues.result[i].verdict == "OK") {
            //console.log("hi")
            correct_answer++;
            ////console.log(jsDataQues.result[i]);
            if (jsDataQues.result[i].problem.rating != undefined) {
              tot_rating_points += jsDataQues.result[i].problem.rating;
            }
            first_date = date;
            quesCount++;
            let cnt = map_date.get(date.getDate() + "/" + date.getMonth());
            if (firstTime) {
              curr_date_badge = date.getDate();
              curr_date_month = date.getMonth();
              firstTime = 0;
            }
            if (
              curr_date_badge == date.getDate() &&
              curr_date_month == date.getMonth()
            ) {
              curr_rating_points_per_date +=
                jsDataQues.result[i].problem.rating != undefined
                  ? jsDataQues.result[i].problem.rating
                  : 0;
            } else {
              max_rating_points_per_date = Math.max(
                max_rating_points_per_date,
                curr_rating_points_per_date
              );
              curr_rating_points_per_date = 0;
              firstTime = 1;
            }
            map_date.set(date.getDate() + "/" + date.getMonth(), cnt + 1);
            ques_on_streak++;
          } else {
            wrong_answer++;
          }

          if (!ppp) {
            curr_date = date.getDate();
            curr_month = date.getMonth();
            ppp = 1;
            continue;
          }
          // Hours part from the timestamp
          if (
            curr_date == date.getDate() + 1 &&
            curr_month == date.getMonth()
          ) {
            if (curr_streak == 0) {
              tmp_start = date.getDate() + "/" + date.getMonth();
              //console.log(tmp_start);
            }
            curr_streak++;
          } else if (curr_month == date.getMonth() + 1) {
            let last_date = date.getMonth() % 2 ? 30 : 31;
            if (date.getMonth() == 1) last_date = 29;
            if (date.getDate() == last_date && curr_date == 1) {
              if (curr_streak == 0)
                tmp_start = date.getDate() + "/" + date.getMonth();
                //console.log(temp_start);
              curr_streak++;
            } else {
              if (max_streak < curr_streak) {
                max_streak = curr_streak;
                //console.log(tmp_start)
                start = tmp_start;
                end = curr_date + "/" + curr_month;
                final_ques_streak = ques_on_streak;
                ques_on_streak = 0;
              }
              curr_streak = 0;
            }
          } else if (curr_date != date.getDate()) {
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
      //console.log(tmp_start)
      //console.log(start)
      let quesDay = (quesCount / 366).toFixed(2);
      let quesWeek = (quesCount / 52).toFixed(2);
      let quesMonth = (quesCount / 12).toFixed(2);
      let cmaxDate = 0;
      let bigDate;
      let day_count = 0;
      for (const elem of map_date) {
        map_month.set(
          parseInt(elem[0].split("/")[1]),
          map_month.get(parseInt(elem[0].split("/")[1])) + elem[1]
        );
        if (elem[1]) day_count++;
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
      ////console.log(map_month);
      ////console.log(first_month);
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
          ////console.log(min_month, elem);
          if (min_month > elem[1]) {
            min_month = elem[1];
            worst_month = elem[0];
          }
        }
      }
      ////console.log(best_month, worst_month);

      let array_date;

      ////console.log(bigDate);
      if(start!=undefined) {
        
        document.querySelector(".days_streak").innerHTML = `${
          max_streak + 1
        } days from ${end.split("/")[0]} ${
          array_names[parseInt(end.split("/")[1])]
        } to  ${start.split("/")[0]} ${
          array_names[parseInt(start.split("/")[1])]
        } `;
      }
      else{
        document.querySelector(".days_streak").innerHTML = `Nothing! `;
      }
      document.querySelector(".date").innerHTML = `${
        bigDate[0].split("/")[0]
      } ${array_names[parseInt(bigDate[0].split("/")[1])]}`;
      document.querySelector(
        ".questions_on_best_day"
      ).innerHTML = `${bigDate[1]}`;
      document.querySelector(".hulk_questions").innerHTML = `${bigDate[1]}`;
      accuracy = (correct_answer / (correct_answer + wrong_answer)) * 100;
      document.querySelector(
        ".greet_number"
      ).innerHTML = `You completed ${quesCount} problems in 2020 with an accuracy of ${Math.ceil(
        accuracy
      )}%. That’s an average of…`;
      $(".avg_per_day").text(`${quesDay} problems`);
      $(".avg_per_week").text(`${quesWeek} problems`);
      $(".avg_per_month").text(`${quesMonth} problems`);
      $(".month").text(array_names[best_month]);
      $(".worst_month").text(array_names[worst_month]);
      $(".questions_on_month").text(map_month.get(best_month));
      $(".inactive_days").text(map_month.get(worst_month));
      $(".questions_on_streak").text(final_ques_streak);
      $(".day_count").text(day_count);
      $(".no_of_days_worked").text(day_count);

      ////console.log(newUrl);
      ////console.log(handle);
      ////console.log(quesCount);
      ////console.log(quesDay);
      ////console.log(quesWeek);
      ////console.log(quesMonth);
      // document.querySelector(".questions1234").innerHTML = quesCount;
      // document.querySelector(".productive_month").innerHTML =
      // array_names[best_month];/
      ////console.log(tot_rating_points);
      ////console.log(max_rating_points_per_date);
      badges_missed.add("thor");
      badges_missed.add("hulk");
      badges_missed.add("cap_gold");
      badges_missed.add("cap_thor");
      badges_missed.add("iron_man");
      badges_missed.add("hawkeye");

      ////console.log(tot_rating_points);
      if (tot_rating_points >= 547500) {
        giveBadge("thor", 3);
        badges_missed.delete("thor");
      } else if (tot_rating_points >= 400000) {
        giveBadge("thor", 2);
        badges_missed.delete("thor");
      } else if (tot_rating_points >= 200000) {
        giveBadge("thor", 1);
        badges_missed.delete("thor");
      }
      if (max_rating_points_per_date >= 17000) {
        giveBadge("hulk", 3);

        badges_missed.delete("hulk");
      } else if (max_rating_points_per_date >= 12000) {
        giveBadge("hulk", 2);

        badges_missed.delete("hulk");
      } else if (max_rating_points_per_date >= 7000) {
        giveBadge("hulk", 1);

        badges_missed.delete("hulk");
      }
      if (max_streak + 1 > 25) {
        giveBadge("cap_gold", 3);
        badges_missed.delete("cap_gold");
      } else if (max_streak + 1 > 20) {
        giveBadge("cap_gold", 2);
        badges_missed.delete("cap_gold");
      } else if (max_streak + 1 > 15) {
        giveBadge("cap_gold", 1);
        badges_missed.delete("cap_gold");
      }
      if (day_count > 240) {
        giveBadge("cap_thor", 3);
        badges_missed.delete("cap_thor");
      } else if (day_count >= 200) {
        giveBadge("cap_thor", 2);
        badges_missed.delete("cap_thor");
      } else if (day_count >= 150) {
        giveBadge("cap_thor", 1);
        badges_missed.delete("cap_thor");
      }
      if (Math.ceil(accuracy) >= 60) {
        giveBadge("hawkeye", 3);
        badges_missed.delete("hawkeye");
      } else if (Math.ceil(accuracy) >= 50) {
        giveBadge("hawkeye", 2);
        badges_missed.delete("hawkeye");
      } else if (Math.ceil(accuracy) >= 40) {
        giveBadge("hawkeye", 1);
        badges_missed.delete("hawkeye");
      }

      // for (let elem of badges_missed) {
      //   ////console.log(elem);
      //   document.querySelector(`._${elem}`).classList.remove("hidden");
      // }
      papp = 1;
      // html2canvas($("#html-content-holder")[0]).then(function(canvas) {
      //   $("#previewImage").append(canvas);
      //   });
      // var img = Pablo(document.getElementById('showtime').outerHTML).toImage();
      // let div=document.createElement("div");
      // img.appendTo(div);
      // alert(div.innerHTML);
      // const canvas = document.createElement("canvas");
      // canvas.width = 631;
      // canvas.height = 631;
      // const ctx = canvas.getContext("2d");
      // var svgString = new XMLSerializer().serializeToString(
      //   document.querySelector("#showtime")
      // );

      // var DOMURL = self.URL || self.webkitURL || self;
      // var img = new Image();
      // var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      // var url = DOMURL.createObjectURL(svg);
      // img.onload = function () {
      //   ctx.drawImage(img, 0, 0);
      //   var png = canvas.toDataURL("image/png");
      //   document.querySelector("#png-container").innerHTML =
      //     '<img src="' + png + '"/>';
      //   DOMURL.revokeObjectURL(png);
      // };
      // img.src = url;
      // document.body.appendChild(img)

      // ////console.log(document.querySelector('.svg_sho').innerHTML)
      // v = canvg.Canvg.fromString(ctx, document.querySelector('.svg_sho').innerHTML);

      // // Start SVG rendering with animations and mouse handling.
      // v.render().then(()=>{
      //   document.body.appendChild(canvas);
      //   var img    = canvas.toDataURL("image/png");
      //   let meta_img=document.createElement('img');
      //   meta_img.setAttribute("src",img);
      //   document.body.appendChild(meta_img);
      //   $('meta[property="og:image"]').remove();
      //   $("head").append(`<meta property="og:image" content="${img}">`);
      //   ////console.log(meta_img);
      // });
      // var img = new Image();
      // img.onload = function() {
      //     ctx.drawImage(img, 0, 0);
      // }
      // img.src = document.querySelector('.svg_sho').innerHTML;
      // document.body.appendChild(img);

      // Create an export button
      // d3.select("body")
      //   .append("button")
      //   .html("Export")
      //   .on("click", svgToCanvas);

      // var w = 631, // or whatever your svg width is
      //   h = 631;

      // Create the export function - this will just export
      // the first svg element it finds
      // function svgToCanvas() {
      //   // Select the first svg element
      //   ////console.clear();
      //   ////console.log(d3.select("#showtime"));
      //   var svg = d3.select("#showtime")[0][0],
      //     img = new Image(),
      //     serializer = new XMLSerializer(),
      //     svgStr = serializer.serializeToString(svg);

      //   img.src = "data:image/svg+xml;base64," + window.btoa(svgStr);

      //   // You could also use the actual string without base64 encoding it:
      //   //img.src = "data:image/svg+xml;utf8," + svgStr;

      //   var canvas = document.createElement("canvas");
      //   document.body.appendChild(canvas);

      //   canvas.width = w;
      //   canvas.height = h;
      //   canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      //   // Now save as png or whatever
      // }
      //   $('meta[property="og:image"]').remove();
      //   $("head").append(`<meta property="og:image" content="${img}">`);
      // var svgElement = document.getElementById("showtime");
      // let { width, height } = svgElement.getBBox();
      // ////console.log(width, height);
      // let clonedSvgElement = svgElement.cloneNode(true);

      // let outerHTML = clonedSvgElement.outerHTML,
      // blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
      // let URL = window.URL || window.webkitURL || window;
      // let blobURL = URL.createObjectURL(blob);
      // let image = new Image();
      // let canvas = document.createElement("canvas");
      // canvas.widht = width;

      // canvas.height = height;
      // let context = canvas.getContext("2d");
      // image.onload = () => {

      //   // draw image in canvas starting left-0 , top - 0
      //   context.drawImage(image, 0, 0);
      //   //  downloadImage(canvas); need to implement
      // };
      // image.src = blobURL;

      // let jpeg = canvas.toDataURL('image/jpg');// default png

      // ////console.clear()
      let first_rating = 0;
      let newnew = 1;
      let last_rating = 0;
      let newUrl2 = userRating + handle;
      const jsonDataRat = await fetch(newUrl2);
      const jsDataRat = await jsonDataRat.json();

      let maxInc = -100000;
      let minInc = 100000;
      let maxRat = -10000;
      let minRat = 100000;
      let countCont = 0;
      let posCount = 0;
      for (let i = 0; i < jsDataRat.result.length; i++) {
        if (
          jsDataRat.result[i].ratingUpdateTimeSeconds >= 1577836800 &&
          jsDataRat.result[i].ratingUpdateTimeSeconds <= 1609459199
        ) {
          dataPointsRatings.push({
            x: parseInt(jsDataRat.result[i].ratingUpdateTimeSeconds) * 1000,
            y: parseInt(jsDataRat.result[i].newRating),
          });
          if (newnew && jsDataRat.result[i].oldRating != 0) {
            first_rating = jsDataRat.result[i].oldRating;
            newnew = 0;
          }
          last_rating = jsDataRat.result[i].newRating;
          countCont++;
          if (jsDataRat.result[i].newRating >= jsDataRat.result[i].oldRating) {
            posCount++;
          }
          if (
            jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating >
              maxInc &&
            jsDataRat.result[i].oldRating != 0
          ) {
            maxInc =
              jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating;
          }
          if (
            jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating <
            minInc
          ) {
            minInc =
              jsDataRat.result[i].newRating - jsDataRat.result[i].oldRating;
          }
          if (jsDataRat.result[i].newRating > maxRat) {
            maxRat = jsDataRat.result[i].newRating;
          }
          if (jsDataRat.result[i].newRating < minRat) {
            minRat = jsDataRat.result[i].newRating;
          }
        }
      }
      ////console.log(first_rating, last_rating)
      if (last_rating - first_rating >= 700) {
        giveBadge("iron_man", 3);
        badges_missed.delete("iron_man");
      } else if (last_rating - first_rating >= 400) {
        giveBadge("iron_man", 2);
        badges_missed.delete("iron_man");
      } else if (last_rating - first_rating >= 200) {
        giveBadge("iron_man", 1);
        badges_missed.delete("iron_man");
      }
      // ////console.cl/ear()
      //console.log(badges_missed);
      if (badges_missed.size == 0) {
        document.querySelector(`._empty`).classList.remove("hidden");
      } else if (badges_missed.size == 6) {
        document.querySelector(`.empty`).classList.remove("hidden");
      }
      ////console.log(badges_missed)
      for (let elem of badges_missed) {
        ////console.log(elem);
        document.querySelector(`._${elem}`).classList.remove("hidden");
      }
      var chart = new CanvasJS.Chart("myChart1", {
        backgroundColor: null,
        animationEnabled: true,
        animationDuration: 2000,
        theme: "light1",
        title: {
          text: "Your Ratings",
        },
        data: [
          {
            type: "splineArea",
            xValueType: "dateTime",
            dataPoints: dataPointsRatings,
          },
        ],
      });
      let posPred = ((posCount * 100) / countCont).toFixed(2);
      $(".rating_pred").html(
        `| ${maxInc} highest increase | ${minInc} maximum decrease | <br />| Peak: ${maxRat} | Low: ${minRat} |`
      );
      $(".probability_of_positive").text(`${posPred} %`);
      chart.render();
    }

    async function heatmapdata() {
      /*for (let i = 1; i < 367; i++) {
        heatmap.set(`${i}`, 0);
      }*/

      let newUrl = userStatus + handle;
      const jsonDataHeat = await fetch(newUrl);
      const jsDataHeat = await jsonDataHeat.json();

      for (let i = 0; i < jsDataHeat.result.length; i++) {
        if (
          jsDataHeat.result[i].creationTimeSeconds >= 1577836800 &&
          jsDataHeat.result[i].creationTimeSeconds <= 1609459199
        ) {
          //let date = new Date(jsDataHeat.result[i].creationTimeSeconds);
          //let date = jsDataHeat.result[i].creationTimeSeconds * 1000;
          //let day = date.getUTCDate();
          //let day = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0);
          //let x = day.toString();
          var now = new Date(jsDataHeat.result[i].creationTimeSeconds * 1000);
          var startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          var timestamp = startOfDay / 1000;
          let x = timestamp;
          if (heatmap[x] === undefined) {
            heatmap[x] = 1;
          } else {
            heatmap[x]++;
          }
        }
      }

      //let d = Object.fromEntries(heatmap);

      //let d = {1577989800: 13};

      var cal = new CalHeatMap();
      cal.init({
        //itemSelector: "#cal",
        data: heatmap,
        itemName: ["Questions", "Accepted Submissions"],
        considerMissingDataAsZero: true,
        legend: [3, 7, 12, 20],
        minDate: new Date(2020, 0),
        maxDate: new Date(2020, 11),
        cellSize: 20,
        cellPadding: 2,
        domain: "month",
        domainGutter: 10,
        domainDynamicDimension: false,
        previousSelector: "#heat_but_left",
        nextSelector: "#heat_but_right",
        domainLabelFormat: function (date) {
          return moment(date).format("MMM, YYYY").toUpperCase();
        },
        subDomain: "x_day",
        subDomainTextFormat: "%d",
        range: 3,
        start: new Date(2020, 0, 1),
      });

      $("#heat_but_left").on("click", function (e) {
        e.preventDefault();
        if (!cal.previous()) {
          alert("2020 begins here, you might wanna push the other button!");
        }
      });

      $("#heat_but_right").on("click", function (e) {
        e.preventDefault();
        if (!cal.next()) {
          alert("2021 is still to come, till then see what's here!");
        }
      });

      ////console.log(heatmap);
    }

    async function getUserSubRatOK() {
      let finalUserSubRatOK = userStatus + handle;

      const jsonDataSubRatOK = await fetch(finalUserSubRatOK);
      const jsDataSubRatOK = await jsonDataSubRatOK.json();
      document.querySelector(".loader").classList.add("hidden");
      document.body.style = "overflow-y:scroll;";

      let dataPointsSubRatOK = [];
      let okProbRat1199 = 0;
      let okProbRat1200_1599 = 0;
      let okProbRat1600_1999 = 0;
      let okProbRat2000_2399 = 0;
      let okProbRat2400_2799 = 0;
      let okProbRat2800 = 0;

      for (let k = 0; k < jsDataSubRatOK.result.length; k++) {
        if (
          jsDataSubRatOK.result[k].verdict == "OK" &&
          jsDataSubRatOK.result[k].creationTimeSeconds >= 1577836800 &&
          jsDataSubRatOK.result[k].creationTimeSeconds <= 1609459199
        ) {
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
      var chart = new CanvasJS.Chart("myChart2", {
        backgroundColor: null,
        animationEnabled: true,
        animationDuration: 2000,
        theme: "light1",
        title: {
          text: "Your Accepted Submissions",
        },
        data: [
          {
            type: "splineArea",
            dataPoints: dataPointsSubRatOK,
          },
        ],
      });
      chart.render();
      //////console.log(dataPointsSubRatOK);
    }

    getQuesCount();
    // getUserRat();
    heatmapdata();
    getUserSubRatOK();
  });

  function giveBadge(str, lev) {
    ////console.log(str);
    document.querySelector(`.${str}`).classList.remove("hidden");
    for (let i = 0; i < lev; i++) {
      let img = document.createElement("img");
      img.setAttribute("src", "images/star.png");
      document.querySelector(`.level_${str}`).appendChild(img);
    }
  }
}
