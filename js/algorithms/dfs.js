let bffa=[];
function DFsS()
{
    c_delay=0;  
    console.log(x_d);
    console.log(y_d);
    vis=[];
    x_o--;y_d--;
    for (let i = 0; i < box_no; i++) {
        let temp=[];
        let temp2=[];
        for (let j = 0; j < box_no2; j++) {
            temp.push(0);
            temp2.push([0,0])
        }
    bffa.push(temp2);
    vis.push(temp);
    }
    vis[x_o][y_o]=0;
    // console.log(cell[770])
    dfs_on_grid(x_o,y_o);
    console.log(bffa)
    let i = bffa[x_d][y_d];
  console.log(i);
  for (i; i != 0; ) {
    // console.log(i); 
    reconstruct(i);
    i = bffa[i[0]][i[1]];
  }
}
let fl=0;
function dfs_on_grid(x,y)
{

    if(cell[(x*box_no+y-1)].classList.contains("end"))
    {
        update_final(x+1,y);
        fl=1;
        return;
    }
    if(isValid(x,y))
    {
        vis[x][y]=1;
    }
    if(isValid(x-1,y))
    {
        let gg=(x-1)*box_no+y-1;
        if(cell[gg].classList.contains("obst"))
        {
            console.log("You are sexy");
        }
        else{
            vis[x][y]=1;
            bffa[x][y] = [x-1, y];
            update_cell(x-1,y);
            dfs_on_grid(x-1,y);
        }
    }
    if(isValid(x,y-1))
    {
        let gg=(x)*box_no+y-2;
        
        if(cell[gg].classList.contains("obst"))
        {
            console.log("You are sexy");
        }
        else{
            vis[x][y]=1;
            bffa[x][y] = [x-1, y];
            update_cell(x,y-1);
            dfs_on_grid(x,y-1);
        }
    }
    if(isValid(x+1,y))
    {
        let gg=(x+1)*box_no+y-1;
        
        if(cell[gg].classList.contains("obst"))
        {
            console.log("You are sexy");
        }
        else{
            vis[x][y]=1;
            bffa[x][y] = [x+1, y];
            update_cell(x+1,y);
            dfs_on_grid(x+1,y);
        }
    }
    if(isValid(x,y+1))
    {
        let gg=(x)*box_no+y;
        
        if(cell[gg].classList.contains("obst"))
        {
            console.log("You are sexy");
        }
        else{
            vis[x][y]=1;
            bffa[x][y] = [x, y+1];
            update_cell(x,y+1);
            dfs_on_grid(x,y+1);
        }
    }
}