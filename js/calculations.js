let handle='';
let url='dashboard.html?handle=';
let button=document.querySelector('#handle_button');
button.addEventListener('click',function(e){
    handle=document.querySelector('#handle').value;
    url=url+handle;
    console.log(handle);
    document.location.href = url;
    // e.preventDefault();
})

