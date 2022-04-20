const User = require('../models/User');
const passport = require('passport');
const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

exports.usuarioAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

exports.generarToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        req.flash('error', 'No existe la cuenta')
        res.render('user/reestablecer', { title: "Restablecer contraseña", mensajes: req.flash() });
    }

    user.token = crypto.randomBytes(20).toString('hex');
    user.tokenExp = Date.now() + 3600000;

    await user.save();

    const resetURL = `http://${req.headers.host}/reestablecer/${user.token}`;
    console.log(resetURL);
}

exports.resetPassword = async (req, res) => {
    const user = await User.findOne({
        where: {
            token: req.params.token
        }
    });

    if(!user){
        req.flash('error','Token no valido');
        res.redirect('/reestablecer')
    }

    res.render('user/resetPassword',{title: 'Restablecer contraseña'})
}