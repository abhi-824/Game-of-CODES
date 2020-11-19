function Insertion_sort(){
    c_delay=0;
    
    for(let i=0;i<array_size.value;i++)
    {
        let val=div_heights[i];
        let hole=i;
        update_div(i,div_heights[i],"red");

        while(hole>0&&div_heights[hole-1]>val)
        {
            update_div(hole,div_heights[hole],"red");
            update_div(hole-1,div_heights[hole-1],"red");
            let temp=div_heights[hole-1]
            div_heights[hole-1]=div_heights[hole];
            div_heights[hole]=temp;
            update_div(hole,div_heights[hole],"teal");
            update_div(hole-1,div_heights[hole-1],"teal");
            hole--;
        }
        
        div_heights[hole]=val;
        update_div(hole,div_heights[hole],"teal");
    }
}