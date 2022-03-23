const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const helpers = require('./helpers');
const flash = require('connect-flash');

// Conexion DB - Generacion de Tablas
const db = require('./config/db');

require('./models/Proyect');
require('./models/Task');
require('./models/User');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(flash());
app.set('views', path.join(__dirname, './views'));
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump
    next();
})

app.use('/', routesIndex())

app.listen(3000)