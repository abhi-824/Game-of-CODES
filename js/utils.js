
document.querySelector("#dashboard1").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let dash_url = "dashboard.html?handle=";
    dash_url += handle;
    document.location.href = dash_url;
  
    e.preventDefault();
  });
  
  document.querySelector("#compare1").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let comp_url = "compare.html?handle=";
    comp_url += handle;
    document.location.href = comp_url;
  
    e.preventDefault();
  });
  
  document.querySelector("#codeblast1").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "codeblast.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
  
    e.preventDefault();
  });
  
  document.querySelector("#topic_wise").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "training_zone_topic_wise.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
  
    e.preventDefault();
  });
  document.querySelector("#level_wise").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "training_zone_level_wise.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
  
    e.preventDefault();
  });
  document.querySelector("#codeblast1").addEventListener("click", function (e) {
    //////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "Codeblast.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
    e.preventDefault();
  });