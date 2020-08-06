const path=require('path');
const http=require('http');
const express=require('express');
const socketio=require('socket.io');


const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',socket=>{
    console.log("new ws connection");
})
//django unchained

app.use(express.static(path.join(__dirname,'public')));

const PORT =3000||process.env.PORT;
app.listen(PORT, ()=> console.log(`dnb${PORT}`));