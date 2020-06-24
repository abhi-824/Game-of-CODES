var handle_name='';
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        // console.log(data);
    document.querySelector('.form-control').value = `${data.handle}`;
}
handle_name=document.querySelector('.form-control').value;

let api_url = 'https://codeforces.com/api/';


let item=document.querySelector('.item1');
let item2=document.querySelector('.item2');
let item3=document.querySelector('.item3');
let item4=document.querySelector('.item4');
let daily_mix_contests=document.querySelector('.daily-mix');
let weak_topics=document.querySelector('.weak_topics');
let strong_topics=document.querySelector('.strong_topics');
let ladders=document.querySelector('.ladders');
let unsolved_mysteries=document.querySelector('.unsolved_mysteries');
function show_please(item)
{
    item.style.width="30vw";
    item.style.height="25vh";
}
function hide_please(item)
{
    item.style.width="24vw";
    item.style.height="auto";
}
item.addEventListener('click',function(e){
    // console.log("aur bhai kya haal chaal");
    show_please(item);
    hide_please(item2);
    hide_please(item3);
    hide_please(item4);
    daily_mix_contests.remove();
    weak_topics.classList.remove('hidden');
    unsolved_mysteries.classList.add('hidden');
    ladders.classList.add('hidden');
    strong_topics.classList.add('hidden');
    // insert_weak_topics();
    e.preventDefault();
});
item2.addEventListener('click',function(e){
    // console.log("aur bhai kya haal chaal");
    show_please(item2);
    hide_please(item);
    hide_please(item3);
    hide_please(item4);
    daily_mix_contests.remove();
    strong_topics.classList.remove('hidden');
    unsolved_mysteries.classList.add('hidden');
    ladders.classList.add('hidden');
    weak_topics.classList.add('hidden');
    // insert_weak_topics();
    e.preventDefault();
});
item3.addEventListener('click',function(e){
    // console.log("aur bhai kya haal chaal");
    show_please(item3);
    hide_please(item2);
    hide_please(item);
    hide_please(item4);
    daily_mix_contests.remove();
    ladders.classList.remove('hidden');
    unsolved_mysteries.classList.add('hidden');
    weak_topics.classList.add('hidden');
    strong_topics.classList.add('hidden');
    // insert_weak_topics();
    e.preventDefault();
});
item4.addEventListener('click',function(e){
    // console.log("aur bhai kya haal chaal");
    show_please(item4);
    hide_please(item2);
    hide_please(item3);
    hide_please(item);
    daily_mix_contests.remove();
    unsolved_mysteries.classList.remove('hidden');
    weak_topics.classList.add('hidden');
    ladders.classList.add('hidden');
    strong_topics.classList.add('hidden');
    // insert_weak_topics();
    e.preventDefault();
});
