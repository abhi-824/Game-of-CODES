
function Bubble(){
    c_delay=0;
    console.log(array_size.value)
    for(let j=1;j<array_size.value;j++)
    {   
        for(let i=0;i<array_size.value-j;i++)
        {
            update_div(i,div_heights[i],"yellow")
            if(div_heights[i]>div_heights[i+1])
            {
                update_div(i,div_heights[i],"red")
                update_div(i+1,div_heights[i+1],"red")
                var temp=div_heights[i];
                div_heights[i]=div_heights[i+1];
                div_heights[i+1]=temp;
                
                update_div(i,div_heights[i],"teal")
                update_div(i+1,div_heights[i+1],"teal")

            }
            update_div(i,div_heights[i],"teal")

        }
        update_div(j,div_heights[j],"teal")
    }
}