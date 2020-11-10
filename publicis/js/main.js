
const divs = [];
let div_heights = [];
let buttons = document.querySelectorAll(".btn-secondary");
let gen_new_array = document.querySelector(".btn-primary");
let array = document.querySelector(".array");
let array_size = document.querySelector("#a_size");
let speed2 = document.querySelector("#a_speed");
let speed = document.querySelector("#a_speed").value;

gen_new_array.addEventListener("click", update_array);
generate_array();
array_size.addEventListener("input", generate_array);
function update_array() {
  array_size = document.querySelector("#a_size");
  generate_array();
}
speed2.addEventListener('input',function(){
  speed = document.querySelector("#a_speed").value;
})
function generate_array() {
  array.innerHTML = "";
  div_heights = [];
  for (let i = 0; i < array_size.value; i++) {
    div_heights[i] = Math.floor(Math.random() * (300 - 10));
    // console.log(div_heights[i])
    divs[i] = document.createElement("div");
    divs[i].style.height = `${div_heights[i]}px`;
    let width = 700 / array_size.value;
    let marign = 1;
    divs[i].style.width = `${width}px`;
    divs[i].style.margin = `0 ${marign}px `;
    divs[i].style.background = `teal`;
    array.appendChild(divs[i]);
  }
}
document.querySelector(".bubble").addEventListener("click", runBubble);
function runBubble() {
  Bubble();
}
document.querySelector(".selection").addEventListener("click", runBubble2);
function runBubble2() {
  Selection_sort();
}
document.querySelector(".insertion").addEventListener("click", runBubble3);
function runBubble3() {
    console.log(div_heights)
    Insertion_sort();
}
document.querySelector(".merge").addEventListener("click", runBubble4);
function runBubble4() {
    Merge_sort(div_heights);
    console.log(div_heights)
}
document.querySelector(".heap").addEventListener("click", runBubble5);
function runBubble5() {
  Heap_sort();
}
document.querySelector(".quick").addEventListener("click", runBubble6);
function runBubble6() {
  c_delay = 0;
  Quick_sort(0, array_size.value - 1);
}
var c_delay = 0;

let delay_time = 9000 / (Math.floor(array_size.value) * speed * 2);
function update_div(i, height, color) {
    delay_time = 9000 / (Math.floor(array_size.value) * speed * 2);
    window.setTimeout(function () {
    divs[i].style.background = `${color}`;
    divs[i].style.height = `${height}px`;
  }, (c_delay += delay_time));
}
