const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).json({message: 'ok', data: 'User microservice is working!'}));

app.listen(port, () => console.log(`User microservice running on http://localhost:${port}`));