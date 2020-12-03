function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function generate_grid() {
  grid.innerHTML="";
  column_width = getWidth();
  column_height = getHeight();
  box_no = Math.floor(column_width / 30);
  box_no2 = Math.floor(column_height / 30);
  // console.log(box_no);
  // console.log(box_no2);
  for (let i = 0; i < box_no2; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < box_no; j++) {
      let div = document.createElement("td");
      div.style.width = "30px";
      div.style.height = "30px";
      div.background = "white";
      div.style.border = "1px solid white";
      div.classList.add("cell");
      tr.appendChild(div);
    }
    grid.appendChild(tr);
  }

  cell = document.querySelectorAll(".cell");
        cell[275].innerHTML="<i class='fas fa-hand-point-right fa-2x'>";
        cell[275].classList.add("src");
        cell[310].innerHTML="<i class='fas fa-hand-lizard fa-2x'>";
        cell[310].classList.add("end");
        
  // console.log(cell);
  let p=0;
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("mouseover", function (e) {
      if(cell[i].innerHTML===''&&cell[i].innerHTML===''){
        cell[i].style.background = "teal";
        cell[i].classList.add("obst");
      }
    });
    cell[i].addEventListener("click", function (e) {
        cell[i].style.background = "black";
        cell[i].classList.add("src");
        cell[275].innerHTML='';
        cell[i].innerHTML="<i class='fas fa-hand-point-right fa-2x'>";
        cell[p].innerHTML='';
        cell[i].classList.remove("obst");
        cell[p].classList.add("obst");  
        cell[p].classList.remove("src");
        p=i;
      });

  }
}
