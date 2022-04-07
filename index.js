const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const passport = require('./config/passport');

// Conexion DB - Generacion de Tablas
const db = require('./config/db');

require('./models/Proyect');
require('./models/Task');
require('./models/User');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.use(flash());
app.use(cookieParse());
app.use(session({
    secret: 'panchez-dot-com',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump
    res.locals.mensajes = req.flash();
    next();
})

app.use('/', routesIndex())

app.listen(3000)