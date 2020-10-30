const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3123;

app.use(cors());
app.use(express.static(__dirname));

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
