const form=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const socket=io();

const {username, room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
document.querySelector('.ready_btn').addEventListener('click',function(e){
    socket.emit('ready',{username,room});
    document.querySelector('.ready_btn').classList.add("disabled");
    e.preventDefault();
})
socket.emit('joinRoom',{username,room})
socket.on('start_contest',()=>{
    
})
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsersName(users);
})
socket.on('message',message=>{
    console.log(message);
    output_mess(message);

    chatMessages.scrollTop=chatMessages.scrollHeight;
    document.querySelector(".messages").scrollTop=document.querySelector(".messages").scrollHeight;
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;

    socket.emit('chatMessage',msg);


    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

})


function output_mess(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
function outputRoomName(room)
{
    document.getElementById('room-name').innerHTML=room;
}
function outputUsersName(user)
{
    document.getElementById('users').innerHTML=`${user.map(user=>`<li>${user.username}</li>`).join('')}`
}