document.querySelector('#handle_submit').addEventListener("submit",(e)=>{
    e.preventDefault();
    document.querySelector('.go_up').classList.add('animate__backOutUp')
    document.querySelector('.go_down').classList.add('animate__backOutDown')    
    document.querySelector('.go_down').addEventListener('animationend',()=>{
        
        document.querySelector('.header').style.height ='0vh';
        document.querySelector('.after_enter').classList.remove('hidden')
    })
    let handle=document.querySelector('#handle').value;
    let name="Abhinandan"
    document.querySelector('.greeting').innerHTML=`Hey ${name}! <br> Pleased to see you fresh and ready for this Year!`
    document.querySelector('.greet_number').innerHTML=`You completed 385 questions in 2020. That’s an average of…`

})