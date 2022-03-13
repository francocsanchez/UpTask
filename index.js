const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routesIndex())

app.listen(3000)