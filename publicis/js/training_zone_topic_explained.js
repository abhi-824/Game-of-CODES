function topic_wise_explained(handle_name,tag_name){
  show_screen(topic_wise_screen2);
  function notifyMe(){
    
    if (!window.Notification) {
      console.log('Browser does not support notifications.');
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        // show notification here
        var notify = new Notification('Timer is Over!!', {
          body: 'Timr is Over but not the question, so do it first :)',
            icon: 'https://bit.ly/2DYqRrh',
        });
      } else {
        // request permission from user
        Notification.requestPermission().then(function(p) {
          if(p === 'granted') {
            // show notification here
             } else {
               console.log('User blocked notifications.');
              }
            }).catch(function(err) {
              console.error(err);
            });
          }
        }
      }
  document.querySelector(".form-control").value = handle_name;
  
  let set1 = [];
  let set2 = [];
  let set3 = [];
  let set4 = [];
  document.querySelector(".start-topic").addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Do You want to start a timer?")) {
      var two_hours = 2*60*60,
      display = document.querySelector(".timer");
      startTimer(two_hours, display);
    }
    document.querySelectorAll(".cont1")[2].classList.remove("hidden");
    document.querySelectorAll(".content1")[0].classList.add("hidden");
    document.querySelectorAll(".cont1")[2].classList.add("animated");
    document.querySelectorAll(".cont1")[2].classList.add("BounceInRight");
    document.querySelector(".footer-img").classList.add("animated");
    document.querySelector(".footer-img").classList.add("bounceOutRight");
    document.querySelector(".start-topic").classList.add("animated");
    document.querySelector(".start-topic").classList.add("bounceOutLeft");
  });
  
  const url2 = "https://codeforces.com/api/user.status?handle=";
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
  getProblems();
  function question(set, problems, low, high) {
    for (let i = 0; i < problems.length; i++) {
      let str = `${problems[i].contestId}-${problems[i].index}`;
      if (
        problems[i].rating >= low &&
        problems[i].rating <= high &&
        solved.has(str) === false &&
        set.includes(str) === false &&
        set1.includes(str) === false &&
        set2.includes(str) === false &&
        set3.includes(str) === false &&
        set4.includes(str) === false &&
        str !== undefined &&
        problems[i].tags.includes("*special") === false
        ) {
          // console.log(problems[i]);
        return str;
      }
    }
  }
  async function getProblems() {
    let modified_url =
    "https://codeforces.com/api/problemset.problems?tags=" + tag_name;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    problems = jsdata.result.problems;
    console.log(problems);
    console.log(problems);
    set1.push(question(set1, problems, 800, 1100));
    set1.push(question(set1, problems, 1100, 1300));
    set1.push(question(set1, problems, 1300, 1400));
    set1.push(question(set1, problems, 1400, 1500));
    set1.push(question(set1, problems, 1500, 1600));
    
    set2.push(question(set2, problems, 900, 1200));
    set2.push(question(set2, problems, 1200, 1500));
    set2.push(question(set2, problems, 1500, 1600));
    set2.push(question(set2, problems, 1600, 1700));
    set2.push(question(set2, problems, 1700, 1800));
    
    set3.push(question(set3, problems, 1000, 1300));
    set3.push(question(set3, problems, 1300, 1600));
    set3.push(question(set3, problems, 1600, 1700));
    set3.push(question(set3, problems, 1700, 1800));
    set3.push(question(set3, problems, 1800, 1900));
    
    set4.push(question(set4, problems, 1100, 1400));
    set4.push(question(set4, problems, 1400, 1700));
    set4.push(question(set4, problems, 1700, 1900));
    set4.push(question(set4, problems, 1800, 1900));
    set4.push(question(set4, problems, 1900, 2200));
    
    console.log(set1);
    console.log(set2);
    console.log(set3);
    console.log(set4);
  }
  console.log(tag_name);
  let buttons = document.querySelectorAll(".generate_daily22");
  for (let i = 0; i < buttons.length; i++) {
    document.querySelector(".update_kro").classList.remove("hidden");
    buttons[i].addEventListener("click", function (e) {
      if (i === 0) {
        display_problems(set1);
      }
      if (i === 1) {
        display_problems(set1);
      }
      if (i === 2) {
        display_problems(set1);
      }
      if (i === 3) {
        display_problems(set1);
      }
    });
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
  function display_problems(set) {
    document.querySelectorAll(".container768")[1].classList.add("animated");
    document.querySelectorAll(".container768")[1].classList.remove("hidden");
    document.querySelectorAll(".container768")[1].classList.add("bounceInRight");
    document.querySelectorAll(".problem-name-1")[1].innerHTML = set[0];
    document.querySelectorAll(".problem-name-2")[1].innerHTML = set[1];
    document.querySelectorAll(".problem-name-3")[1].innerHTML = set[2];
    document.querySelectorAll(".problem-name-4")[0].innerHTML = set[3];
    document.querySelectorAll(".problem-name-5")[0].innerHTML = set[4];
    let link1 = document.createElement("div");
    let link2 = document.createElement("div");
    let link3 = document.createElement("div");
    let link4 = document.createElement("div");
    let link5 = document.createElement("div");
    let p = convert_to_link(`${set[0]}`);
    let p2 = convert_to_link(`${set[1]}`);
    let p3 = convert_to_link(`${set[2]}`);
    let p4 = convert_to_link(`${set[3]}`);
    let p5 = convert_to_link(`${set[4]}`);
    link1.innerHTML = `<a href="${p}" target="_blank">Do It</a>`;
    link2.innerHTML = `<a href="${p2}"  target="_blank">Do It</a>`;
    link3.innerHTML = `<a href="${p3}"  target="_blank">Do It</a>`;
    link4.innerHTML = `<a href="${p4}"  target="_blank">Do It</a>`;
    link5.innerHTML = `<a href="${p5}"  target="_blank">Do It</a>`;
    document.querySelectorAll(".content1")[1].appendChild(link1);
    document.querySelectorAll(".content1")[2].appendChild(link2);
    document.querySelectorAll(".content1")[3].appendChild(link3);
    document.querySelectorAll(".content1")[4].appendChild(link4);
    document.querySelectorAll(".content1")[5].appendChild(link5);
    // document.querySelectorAll(".container768")[1].classList.add("bounceInRight");
  }
  
  // Timer for countdown
  function startTimer(duration, display) {
    var timer = duration,
    minutes,
    seconds;
    let x=setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = duration;
      }
      if(display.textContent==='00:00')
      {
        
        notifyMe();
        clearInterval(x);
      }
    }, 1000);
  }
  document.querySelector(".update_kro").addEventListener("click",update);
  function update()
  {
    getSolved();
    let yummy=document.querySelectorAll(".problems_hai_bhai");
    for(let i=0;i<yummy.length;i++)
    {
      console.log(yummy[i].innerHTML);
      if(solved.has(yummy[i].innerHTML))
      {
        yummy[i].innerHTML="You Did It, You ..."
  
  
      }
    }
    
  }
}