const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

app.listen(5000, () => console.log(`Listening on port 5000`));
