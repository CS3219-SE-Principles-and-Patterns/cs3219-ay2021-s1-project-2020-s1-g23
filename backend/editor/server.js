const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3123;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// Redis set up
const redis = require("redis");
const redisHostname = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;
const redisSecret = process.env.REDIS_SECRET || "password";

const client = redis.createClient(redisPort, redisHostname, { no_ready_check: true });
client.auth(redisSecret);
client.on("error", err => console.log("Error " + err));
client.on("connect", () => console.log("Connected to Redis"));

app.get("/", (req, res) => res.send("Hello World!"));

// Socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);
io.on("connection", () => {
  console.log("a user is connected");
});

/**
 * Retrieves question and set sessionKey in redis
 * @param req.body.sessionKey
 * @returns question
 */
app.post("/connect", (req, res) => {
  const sessionKey = req.body.sessionKey;
  client.get(sessionKey, (err, reply) => {
    // reply will be null if sessionKey does not exist
    if (reply !== null) {
      res.send(400, "Error: Session key is already in use! Maybe try /update?");
    } else {
      const qn = "Reverse linked list"; // placeholder
      console.log("New connection, retrieving question: " + qn);
      const sessionObj = { question: qn, text: "" };
      client.set([sessionKey, JSON.stringify(sessionObj)], () => res.send(201, qn));
    }
  });
});

/**
 * Updates code body
 * @param req.body.sessionKey
 * @param req.body.codeBody
 * @returns status code 202 if accepted
 */
app.post("/update", (req, res) => {
  const sessionKey = req.body.sessionKey;
  const codeBody = req.body.codeBody;
  client.get(sessionKey, (err, reply) => {
    // reply will be null if sessionKey does not exist
    if (reply === null) {
      res.send(400, "Error: Session key not found, maybe try /connect?");
    } else {
      console.log("Updating code body: " + codeBody);
      const sessionObj = { question: reply.question, text: codeBody };
      client.set([sessionKey, JSON.stringify(sessionObj)], () => res.sendStatus(202));
    }
  });
});

/**
 * Retrieves code
 * @param req.body.sessionKey
 * @returns code in string form
 */
app.post("/code", (req, res) => {
  const sessionKey = req.body.sessionKey;
  client.get(sessionKey, (err, reply) => {
    // reply will be null if sessionKey does not exist
    if (reply === null) {
      res.send(400, "Error: Session key not found, maybe try /connect?");
    } else {
      const sessionObj = JSON.parse(reply);
      console.log("Retrieving code body: " + sessionObj.text);
      res.send(sessionObj.text);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
