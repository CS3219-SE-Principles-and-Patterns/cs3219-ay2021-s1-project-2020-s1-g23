require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { path: "/editor/new" }).of("/editor");

const redis = require("redis");
// const client = redis.createClient();
const client = redis.createClient({
  host: "redis-cluster.ppg54m.0001.apse1.cache.amazonaws.com",
  port: 6379
});
client.on("connect", () => console.log("Connected to Redis"));
client.on("error", function (error) {
  console.error(error);
});

app.get("/editor/ping", (req, res) => {
  res.status(200).json({ message: "pong", data: "Editor microservice is working" });
});

const { genQuestion, retrieveQuestion } = require("./question-generator");
app.get("/editor/question", (req, res) => {
  const { sessionId, difficulty } = req.query;
  console.log(req.query);
  if (!sessionId) {
    res.status(400).json("No parameters");
  }
  client.get(sessionId, (err, redisRes) => {
    if (redisRes === null) {
      const obj = genQuestion(difficulty);
      client.set(sessionId, obj.key, redis.print);
      res.status(200).json(obj.questionObj);
    } else {
      const qn = retrieveQuestion(redisRes, difficulty);
      res.status(200).json(qn);
    }
  });
});

app.get("/editor/end-session", (req, res) => {
  const sessionId = req.query.sessionId;
  client.del(sessionId, (err, redisRes) => {
    console.log("Deleted ", sessionId);
    res.status(200).json("Deleted session");
  });
});

io.on("connection", socket => {
  socket.on("newMessage", msg => {
    io.emit(msg.sessionId, msg.payload);
  });
});
const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log(`Editor ms listening on port ${port}...`);
});
