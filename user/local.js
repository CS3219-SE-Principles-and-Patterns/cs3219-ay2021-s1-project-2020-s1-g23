const app = require('./index');
const port = process.env.PORT || 8080;

// run the server locally
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));