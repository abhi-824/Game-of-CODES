function topic_wise(handle_name)
{
  show_screen(topic_wise_screen)
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
  let div2_a=document.querySelectorAll('.div2_a')
  let div2_b=document.querySelectorAll('.div2_b')
  let div2_c=document.querySelectorAll('.div2_c')
  let div2_d=document.querySelectorAll('.div2_d')
  let div2_e=document.querySelectorAll('.div2_e')
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
  let weak_topicss = [];
  let strong_topicss = [];
  
    
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
      
      let tb = document.querySelector(".weak_topicsss");
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
  
      let tb1 = document.querySelector(".strong_topicsss");
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
  
      let practice_each_topic = document.querySelectorAll(".practice_topic");
  
      for (let i = 0; i < practice_each_topic.length; i++) {
        practice_each_topic[i].addEventListener("click", function (e) {
          document.querySelector('.container411').style.height="200vh";
          document.querySelectorAll('.container2')[1].style.height="200vh";
          let new_tag_map = new Map();
          document.querySelector('.start_btn').classList.remove("hidden");
          for (let i = 800; i < 3200; i += 100) {
            new_tag_map.set(i, 0);
          }
          let tag_name =
            practice_each_topic[i].parentElement.firstChild.innerHTML;
          // //console.log(tag_name);
  
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
            document.querySelector("#chartContainer2").classList.remove("hidden");
            let datapoints = [];
            for (key of new_tag_map) {
              //console.log(key);
              datapoints.push({ x: key[0], y: key[1] });
            }
            var chart = new CanvasJS.Chart("chartContainer2", {
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
          // get_problems();
          document.querySelector('.start').addEventListener('click',function(){
            
            topic_wise_explained(handle_name,tag_name);
          })
          // display_sets();
          // display_problems();
          document.querySelector("#chartContainer").classList.add("animated");
          document
            .querySelector("#chartContainer")
            .classList.add("bounceInRight");
          e.preventDefault();
        });
      }
    }
    getsubmissions();
    function convert_to_id(link){
      let j;
      let contest;let id;
      for(let i=link.length;i>=0;i--)
      {
        if(link[i]==='/')
        {
  
          j=i-1;
          break;
        }
        else{
          id+=link[i];
        }
      }
      for(j;j>=0;j--)
      {
        if(link[j]==='/')
        {
          break;
        }
        else{
          contest+=link[j];
        }
      }
      return `${contest}-${id}`;
    }
    function check_for_solved_problems(){
      for(let i=0;i<div2_a.length;i++)
      {
        let str=convert_to_id(div2_a[i].href);
        if(solved.has(str))
        {
          div2_a[i].classList.add("already_taken");
        }
      }
      for(let i=0;i<div2_b.length;i++)
      {
        let str=convert_to_id(div2_b[i].href);
        if(solved.has(str))
        {
          div2_b[i].classList.add("already_taken");
        }
      }
      for(let i=0;i<div2_c.length;i++)
      {
        let str=convert_to_id(div2_c[i].href);
        if(solved.has(str))
        {
          div2_c[i].classList.add("already_taken");
        }
      }
      for(let i=0;i<div2_d.length;i++)
      {
        let str=convert_to_id(div2_d[i].href);
        if(solved.has(str))
        {
          div2_d[i].classList.add("already_taken");
        }
      }
      for(let i=0;i<div2_e.length;i++)
      {
        let str=convert_to_id(div2_e[i].href);
        if(solved.has(str))
        {
          div2_e[i].classList.add("already_taken");
        }
      }
    }
    check_for_solved_problems();
    let tag_problems=new Map();
    function generate_topics(str){
  
    }
    function make_list_of_tags(){
      for(let i=0;i<div2_a.length;i++)
      {
        if(div2_a[i].classList.length!==3){
          let str=convert_to_id(div2_a[i].href);
          let tags=generate_topics(str);
          for(let i=0;i<tags.length;i++)
          {
            let val=tag_problems[tags[i]];
            val.push(str)
            tag_problems.set(tags[i],val);
          }
        }
      }
      for(let i=0;i<div2_b.length;i++)
      {
        if(div2_b[i].classList.length!==3){
          let str=convert_to_id(div2_b[i].href);
          let tags=generate_topics(str);
          for(let i=0;i<tags.length;i++)
          {
            let val=tag_problems[tags[i]];
            val.push(str)
            tag_problems.set(tags[i],val);
          }
        }
      }
      for(let i=0;i<div2_c.length;i++)
      {
        if(div2_a[i].classList.length!==3){
          let str=convert_to_id(div2_c[i].href);
          let tags=generate_topics(str);
          for(let i=0;i<tags.length;i++)
          {
            let val=tag_problems[tags[i]];
            val.push(str)
            tag_problems.set(tags[i],val);
          }
        }
      }
      for(let i=0;i<div2_d.length;i++)
      {
        if(div2_d[i].classList.length!==3){
          let str=convert_to_id(div2_d[i].href);
          let tags=generate_topics(str);
          for(let i=0;i<tags.length;i++)
          {
            let val=tag_problems[tags[i]];
            val.push(str)
            tag_problems.set(tags[i],val);
          }
        }
      }
      
      for(let i=0;i<div2_e.length;i++)
      {
        if(div2_e[i].classList.length!==3){
          let str=convert_to_id(div2_e[i].href);
          let tags=generate_topics(str);
          for(let i=0;i<tags.length;i++)
          {
            let val=tag_problems[tags[i]];
            val.push(str)
            tag_problems.set(tags[i],val);
          }
        }
      }
    }  
    make_list_of_tags();
    
}
