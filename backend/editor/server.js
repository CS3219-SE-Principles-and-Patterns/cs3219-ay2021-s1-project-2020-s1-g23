const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) =>
  res.status(200).json({ message: "ok", data: "Editor microservice is working" })
);

const getQuestion = require("./question-generator");
io.on("connection", socket => {
  const qn = getQuestion();
  socket.emit("Question", qn.question, qn.input, qn.output);
  socket.on("newMessage", msg => {
    io.emit(msg.sessionId, msg.payload);
  });
});
const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log(`Editor ms listening on port ${port}...`);
});
