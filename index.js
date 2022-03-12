const express = require('express');
const path = require('path');
const routesIndex = require('./routes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use('/', routesIndex())

app.listen(3000)