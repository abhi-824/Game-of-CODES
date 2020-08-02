function BFS() {
  c_delay = 0;
  let q = []; 
  affa=[];
  vis=[];
  let dist = [];
  for (let i = 0; i < box_no; i++) {
    let temp = [];
    for (let j = 0; j < box_no2; j++) {
      temp.push(0);
      vis.push([0, 0]);
    }
    dist.push(temp);
    affa.push(temp);
  }
  x_o--;
  q.push([x_o, y_o]);
  dist[x_o][y_o] = 0;
  vis[x_o][y_o] = 1;
  // console.log(x_d);
  // console.log(y_d);
  let fl = 0;
  while (q.length !== 0) {
    let curX = q[0][0];
    let curY = q[0][1];
    q.shift();
    for (let i = 0; i < 4; i++) {
      let gg = (curX + dx[i]) * box_no + curY + dy[i] - 1;
      if (gg < 0 || gg >= cell.length) {
        continue;
      }
      if (
        isValid(curX + dx[i], curY + dy[i]) &&
        !cell[gg].classList.contains("obst")
      ) {
        let newX = curX + dx[i];
        let newY = curY + dy[i];
        dist[newX][newY] = dist[curX][curY] + 1;
        affa[newX][newY] = [curX, curY];
        if (newX === x_d && newY === y_d) {
          update_final(newX, newY);
          fl = 1;
          break;
        }
        update_cell(newX, newY);
        vis[newX][newY] = 1;
        q.push([newX, newY]);
      }
    }
    if (fl) {
      break;
    }
  }
  // console.log(x_d);
  // console.log(y_d);
  // console.log(affa);
  let i = affa[x_d][y_d];
  console.log(i);
  for (i; i != 0; ) {
    // console.log(i); 
    reconstruct(i);
    i = affa[i[0]][i[1]];
  }
  // console.log(dist);
  // console.log(affa);
}
