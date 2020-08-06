
document.querySelector(".join_room").addEventListener("click", function (e) {
    ////console.log("Going to dashboard!");
    let handle = document.querySelector(".form-control").value;
    let cblast_url = "code_blast_enter.html?handle=";
    cblast_url += handle;
    document.location.href = cblast_url;
    e.preventDefault();
    
  });