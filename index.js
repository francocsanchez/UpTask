const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const passport = require('./config/passport');

require('dotenv').config({ path: 'variables.env' })

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
    res.locals.usuario = { ...req.user } || null;
    next();
})

app.use('/', routesIndex())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Server running...')
})

require('./handlers/email');