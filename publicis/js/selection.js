    
function Selection_sort(){
    c_delay=0;

    for(let i=0;i<array_size.value-1;i++)
    {
        let minim=i;
        for(let j=i+1;j<array_size.value;j++)
        {
            update_div(j,div_heights[j],"yellow");

            if(div_heights[minim]>div_heights[j])
            {
                update_div(j,div_heights[j],"red");
                update_div(minim,div_heights[minim],"red");
                let temp=div_heights[minim];
                div_heights[minim]=div_heights[j];
                div_heights[j]=temp;
                
                update_div(j,div_heights[j],"teal");
                update_div(minim,div_heights[minim],"teal");
                // minim=j;
            }
            update_div(j,div_heights[j],"teal");

        }
        update_div(minim,div_heights[minim],"teal");
    }
}