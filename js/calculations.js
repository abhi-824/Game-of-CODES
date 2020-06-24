let handle='';
let url='file:///F:/Game-of-CODES-master/dashboard.html?handle=';
let button=document.querySelector('#handle_button');
button.addEventListener('click',function(e){
    handle=document.querySelector('#handle').value;
    url=url+handle;
    console.log(handle);
    if(!handle)
    {
        alert("Please enter User handle");
    }
    else{
        document.location.href = url;

    }

    e.preventDefault();
})

