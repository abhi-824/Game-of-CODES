// 1577836800 1 Jan 2020 00:00:00
// 1609459199 31 Dec 2020 23:59:59

var handle;
const userStatus = "https://codeforces.com/api/user.status?handle=";
var quesCount = 0;

document.querySelector('#handle_submit').addEventListener("submit",(e)=>{
    e.preventDefault();
    document.querySelector('.go_up').classList.add('animate__backOutUp')
    document.querySelector('.go_down').classList.add('animate__backOutDown') 
    handle=document.querySelector('#handle').value;
    setTimeout(()=>{
        window.location.href =window.location.href.split("index.html")[0]+`report.html?handle=${handle}`      
        document.querySelector('body').style.overflowY ="scroll";
        // document.querySelector('.go_down').addEventListener('animationend',()=>{
        //     console.log('I AM HERE');
        //     window.location.href =window.location.href.split("index.html")[0]+`report.html?handle=${handle}`      
        // })
    },2000)
    setTimeout(()=>{
        document.querySelector('.load').style.display = "none";
    },2100)
    document.querySelector('.load').style.display = "flex";
    document.querySelector('body').style.overflowY ="hidden";



})