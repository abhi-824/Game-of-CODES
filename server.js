const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage=require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers,make_ready,allready,giveProblems}=require('./utils/users')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//django unchained

app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
    

  console.log("new ws connection");
 
  socket.on('disconnect',()=>{
      const user=userLeave(socket.id);
      if(user)
      {
          io.to(user.room).emit('message',formatMessage('BOSS',`${user.username} has left the chat`));
          io.to(user.room).emit('roomUsers',{room:user.room,users:getRoomUsers(user.room)})
      }
  })
  socket.on('ready',({username,room})=>{
    const user=make_ready(socket.id,username,room,1);
    if(allready())
    {
      io.to(user.room).emit("start_contest",giveProblems());
      // start_contest();
    }
  })
  socket.on('joinRoom',({username,room})=>{

    const user=userJoin(socket.id,username,room)
    socket.join(user.room)

    socket.emit("message", formatMessage('BOSS',"Welcome to CodeBlast, ready to blast your code?"));

    socket.broadcast.to(user.room).emit('message',formatMessage('BOSS',`${user.username} has joined the room`));

    io.to(user.room).emit('roomUsers',{room:user.room,users:getRoomUsers(user.room)})
  
})
  socket.on('chatMessage',(msg)=>{
      const user=getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,msg))
  })
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`dnb${PORT}`));
