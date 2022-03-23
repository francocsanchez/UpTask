const User = require('../models/User');

exports.formLogin = (req, res) => {
    res.render('user/crearCuenta', { title: "Crear cuenta" });
}

exports.crearCuenta = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.create({ email, password });
        res.redirect('/inicar-sesion');
    } catch (error) {
        res.render('user/crearCuenta', { title: "Crear cuenta", errors: error.errors });
    }
}