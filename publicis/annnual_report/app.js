// 1577836800 1 Jan 2020 00:00:00
// 1609459199 31 Dec 2020 23:59:59

var handle;
const userStatus = "https://codeforces.com/api/user.status?handle=";
var quesCount = 0;

document.querySelector('#handle_submit').addEventListener("submit",(e)=>{
    e.preventDefault();
    document.querySelector('.go_up').classList.add('animate__backOutUp')
    document.querySelector('.go_down').classList.add('animate__backOutDown')    
    document.querySelector('.go_down').addEventListener('animationend',()=>{
        
        document.querySelector('.header').style.height ='0vh';
        document.querySelector('.after_enter').classList.remove('hidden')
    })
    handle=document.querySelector('#handle').value;
    let name="Abhinandan"
    document.querySelector('.greeting').innerHTML=`Hey ${handle}! <br> Pleased to see you fresh and ready for this Year!`
    //document.querySelector('.greet_number').innerHTML=`You completed 385 questions in 2020. That’s an average of…`
    getSetGo();

})

function getSetGo() {
    $(document).ready(function() {
    
        async function getQuesCount() {
            let newUrl = userStatus + handle;
            const jsonDataQues = await fetch(newUrl);
            const jsDataQues = await jsonDataQues.json();
    
            for (let i = 0; i < jsDataQues.result.length; i++) {
                if (jsDataQues.result[i].creationTimeSeconds >= 1577836800 && jsDataQues.result[i].creationTimeSeconds <= 1609459199) {
                    if (jsDataQues.result[i].verdict == "OK") {
                        quesCount++;
                    }
                }
            }

            let quesDay = (quesCount / 366).toFixed(2);
            let quesWeek = (quesCount / 52).toFixed(2);
            let quesMonth = (quesCount / 12).toFixed(2);

            document.querySelector('.greet_number').innerHTML=`You completed ${quesCount} questions in 2020. That’s an average of…`;
            $(".avg_per_day").text(`${quesDay} questions`);
            $(".avg_per_week").text(`${quesWeek} questions`);
            $(".avg_per_month").text(`${quesMonth} questions`);
    
            console.log(newUrl);
            console.log(handle);
            console.log(quesCount);
            console.log(quesDay);
            console.log(quesWeek);
            console.log(quesMonth);
        }
    
        getQuesCount();
    });
}