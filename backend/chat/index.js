const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', () => console.log('Chat microservice is working!'));

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
  socket.on('newMessage', msg => {
    io.emit(msg.sessionId, msg.payload);
  });
});

server.listen(3000, () => {
  console.log('listening on port 3000...');
});
