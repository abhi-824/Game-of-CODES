function update_cell(x, y) {
  // console.log(x);
  // console.log(y);
  window.setTimeout(function () {
    let no = x * box_no + y;
    cell[no - 1].style.background = "purple";
  }, (c_delay += delay_time));
}
function update_final(newX, newY) {
  window.setTimeout(function () {
    cell[(newX - 1) * box_no + newY - 1].style.background = "yellow";
  }, (c_delay += delay_time));
}
function reconstruct(i) {
  window.setTimeout(function () {
    if (i != 0) {
      let no = i[0] * box_no + i[1];
      console.log(typeof i);
      console.log(no);
      cell[no - 1].style.background = "yellow";
    }
  }, (c_delay += delay_time));
}
