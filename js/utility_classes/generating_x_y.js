function x_origin() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].classList.contains("src")) {
      return Math.ceil((i + 1) / box_no);
    }
  }
}
function y_origin() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].classList.contains("src")) {
      return (i + 1) % box_no;
    }
  }
}
function x_destination() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].classList.contains("end")) {
      return Math.ceil((i + 1) / box_no);
    }
  }
}
function y_destination() {
  for (let i = 0; i < cell.length; i++) {
    if (cell[i].classList.contains("end")) {
      return (i + 1) % box_no;
    }
  }
}
function isValid(curX, curY) {
  if (curX < 0 || curY < 0 || vis[curX][curY] == 1) {
    return false;
  } else if (curX > box_no2 || curY > box_no) {
    return false;
  } else {
    return true;
  }
}
