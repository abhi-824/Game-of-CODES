var load_kk=document.querySelector(".load-kro");


window.addEventListener("load",function(){
  load_kk.classList.add("disapper")
})
let box_no;
let box_no2;
let column_height;
let column_width;
let create_grid=document.querySelector('.reset');
create_grid.addEventListener("click",generate_grid);
let grid=document.querySelector("#grid");
let cell;
generate_grid();
let x_o;
let y_o;
let x_d;
let y_d;
let vis=[];
let c_delay=0;
let delay_time=11;
let dx=[0,0,1,-1];
let affa=[];
let dy=[1,-1,0,0];
document.querySelector('.bfs').addEventListener("click",roll);
function roll(){
    x_o=x_origin();
    // console.log(x_o);
    y_o=y_origin();
    // console.log(y_o);
    x_d=x_destination();
    y_d=y_destination();
    // console.log(x_d);
    // console.log(y_d);
    BFS();
}
document.querySelector('.dfs').addEventListener("click",roll2)
function roll2(){
    x_o=x_origin();
    y_o=y_origin();
    x_d=x_destination();
    y_d=y_destination();
    
    DFsS();
}
document.querySelector('.a_star').addEventListener("click",function(e){
    x_o=x_origin();
    y_o=y_origin();
    x_d=x_destination();
    y_d=y_destination();
    a_star();
    e.preventDefault();
})
document.querySelector('.dij').addEventListener("click",function(e){
    x_o=x_origin();
    y_o=y_origin();
    x_d=x_destination();
    y_d=y_destination();
    dij();
    e.preventDefault();
})