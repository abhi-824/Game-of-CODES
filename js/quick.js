
function Quick_sort(low,high)
{
    if(low<high)
    {
        let pi=partition(low,high)
        Quick_sort(low,pi-1);
        Quick_sort(pi+1,high);
    }
}
function partition(low,high)
{
    let pivot=div_heights[high];
    // update_div(low,div_heights[low],"yellow");
    let i=low-1;
    for(let j=low;j<=high-1;j++)
    {
        if(div_heights[j]<pivot)
        {
            i++;
            update_div(i,div_heights[i],"red")
            update_div(j,div_heights[j],"red")
            let temp=div_heights[i]
            div_heights[i]=div_heights[j]
            div_heights[j]=temp
            update_div(i,div_heights[i],"teal")
            update_div(j,div_heights[j],"teal")
        }   
    }
    let temp=div_heights[i+1]
    div_heights[i+1]=div_heights[high]
    div_heights[high]=temp;
    update_div(high,div_heights[high],"teal")
    update_div(i+1,div_heights[i+1],"teal")
    return(i+1);
}