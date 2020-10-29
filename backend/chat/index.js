const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);
const io = require('socket.io')(server, {path: '/new'}).of('/chat');

app.get('/chat', (req, res) => res.status(200).json({message: 'ok', data: 'Chat microservice is working!'}));

io.on('connection', socket => {
  socket.on('newMessage', msg => {
    io.emit(msg.sessionId, msg.payload);
  });
});

const port = process.env.PORT || 5002
server.listen(port, () => {
  console.log(`Chat ms listening on port ${port}...`);
});
