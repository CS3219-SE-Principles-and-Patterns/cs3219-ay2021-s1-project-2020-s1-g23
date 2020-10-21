require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;
if (!dbUsername || !dbPassword) {
  console.error('Please specify the database username and password as environment variables!');
  process.exit(1);
}
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@peerprep.bzetx.mongodb.net/peerprep?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to db'));
db.once('open', console.error.bind(console, 'Db connected successfully'));

const userController = require('./controllers/user-controller');

app.get('/', (req, res) => res.status(200).json({message: 'ok', data: 'User microservice is working!'}));

app.route('/user')
  .get(userController.index)
  .post(userController.new);

app.route('/user/login/:email')
  .post(userController.login);

app.route('/user/:user_id')
  .get(userController.view)
  .put(userController.update)
  .delete(userController.delete);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
