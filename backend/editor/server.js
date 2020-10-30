const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3123;

app.use(cors());
app.use(bodyParser.json());

const redis = require("redis");
const redisHostname = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;
const redisSecret = process.env.REDIS_SECRET || "password";

const client = redis.createClient(redisPort, redisHostname, { no_ready_check: true });
client.auth(redisSecret);

client.on("error", function (err) {
  console.log("Error " + err);
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * Retrieves question and set sessionKey in redis
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
      client.set(sessionKey, JSON.stringify(sessionObj));
      res.send(qn);
    }
  });
});

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
      client.set(sessionKey, JSON.stringify(sessionObj));
      res.send(200);
    }
  });
});

app.post("/getCode", (req, res) => {
  const sessionKey = req.body.sessionKey;
  client.get(sessionKey, (err, reply) => {
    // reply will be null if sessionKey does not exist
    if (reply === null) {
      res.send(400, "Error: Session key not found, maybe try /connect?");
    } else {
      console.log("Updating code body: " + codeBody);
      const sessionObj = { question: reply.question, text: codeBody };
      client.set(sessionKey, JSON.stringify(sessionObj));
      res.send(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
