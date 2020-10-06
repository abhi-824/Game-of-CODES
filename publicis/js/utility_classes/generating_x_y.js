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
function isValid(X, Y) {
  if (X < 0 || Y <= 0 || vis[X][Y] === 1||fl===1) {
    return false;
  } else if (X >= box_no2 ||Y >= box_no) {
    return false;
  } else {
    return true;
  }
}
