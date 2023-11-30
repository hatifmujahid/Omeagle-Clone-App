const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});
let onlineUsers = 0; 
let connectedUsers = [];




io.on('connection', (socket) => {
  
  console.log('a user connected');
  onlineUsers++;
  connectedUsers.push(socket.id);
  console.log(connectedUsers);


  socket.on('recieve message', (msg) => {
    console.log('recieved message', msg);
    socket.broadcast.emit('recieve message', msg);
  });
  socket.on('send message', (msg) => {
    console.log('sending message', msg);
    socket.broadcast.emit('recieve message', msg);
  });

  socket.on('disconnect', () => {
    const disconnectedUserId = socket.id;
    connectedUsers.splice(connectedUsers.indexOf(disconnectedUserId), 1);
    console.log("user disconnected");
    console.log(connectedUsers);
    onlineUsers--;
  });
});

app.get('/users', (req, res) => {
  res.json({users: onlineUsers});
});

app.get('/randomUser', (req, res) => {
  res.json({user: connectedUsers[Math.floor(Math.random() * connectedUsers.length)]});
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


