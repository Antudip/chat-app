const express = require('express');
const http = require('http');
const app = express();
const servidor = http.createServer(app);

const socketIo = require('socket.io');
// const io = socketIo(servidor); 
const io = socketIo(servidor,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

io.on('connection', socket => {
    let lefterName;
    socket.on('onLine',(name)=>{
        lefterName = name[0].toUpperCase() + name.slice(1);
        socket.broadcast.emit('toMessageArray',{name, message: lefterName + ' has join the room'});
    });
    socket.on('message',(name, message)=>{
        io.emit('toMessageArray',{name, message: `${name}: ${message}`});
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('toMessageArray',{name:"Servidor", message:lefterName + ' has left the room'});
    });
   
})

servidor.listen(3001, ()=>{console.log('servidor inicializado')});