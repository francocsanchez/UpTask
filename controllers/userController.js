const User = require('../models/User');
const flash = require('connect-flash');

exports.formLogin = (req, res) => {
    res.render('user/crearCuenta', { title: "Crear cuenta" });
}

exports.crearCuenta = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.create({ email, password });
        res.redirect('/inicar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('user/crearCuenta', {
            title: "Crear cuenta",
            mensajes: req.flash(),
            email,
            password
        });
    }
}