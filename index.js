const express = require('express');
const routesIndex = require('./routes');

const app = express();

app.use('/', routesIndex())

app.listen(3000)