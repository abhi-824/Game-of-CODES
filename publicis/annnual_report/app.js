document.querySelector('#handle_submit').addEventListener("submit",(e)=>{
    e.preventDefault();
    document.querySelector('.go_up').classList.add('animate__backOutUp')
    document.querySelector('.go_down').classList.add('animate__backOutDown')    
    document.querySelector('.go_down').addEventListener('animationend',()=>{
        
        document.querySelector('.header').style.height ='0vh';
    })
    let handle=document.querySelector('#handle').value;

})