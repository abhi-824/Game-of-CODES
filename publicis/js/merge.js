function Merge_sort() {
  // console.log(a);
  c_delay=0;
  console.log(div_heights)
  merge_bhai(0,div_heights.length-1);
}

function merge_sort(start,mid,end){
    let p=start;
    let q=mid+1;
    let a=[],k=0;
    for(let i=start;i<=end;i++)
    {
        if(p>mid)
        {
            a[k++]=div_heights[q++];
            update_div(q-1,div_heights[q-1],"red");
        }
        else if(q>end){
            a[k++]=div_heights[p++];
            update_div(p-1,div_heights[p-1],'red');
        }
        else if(div_heights[p]<div_heights[q]){
            a[k++]=div_heights[p++];
            update_div(p-1,div_heights[p-1],'red');
        }
        else{
            a[k++]=div_heights[q++];
            update_div(q-1,div_heights[q-1],"red");
        }
    }
    console.log(a);
    for(let i=0;i<k;i++)
    {
        div_heights[start++]=a[i];
        update_div(start-1,div_heights[start-1],"teal");
    }
}
function merge_bhai(start,end){
    if(start<end)
    {
        let mid=Math.floor((start+end)/2);
        merge_bhai(start,mid);
        merge_bhai(mid+1,end);
        merge_sort(start,mid,end);
    }   
}