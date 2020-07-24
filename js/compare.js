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
  