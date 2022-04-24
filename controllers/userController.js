const User = require('../models/User');
const flash = require('connect-flash');
const enviarEmail = require('../handlers/email')

exports.formLogin = (req, res) => {
    res.render('user/crearCuenta', { title: "Crear cuenta" });
}

exports.iniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('user/iniciarSesion', { title: "Inicio de sesión", error });
}

exports.crearCuenta = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.create({ email, password });

        const user = { email }
        const confirURL = `http://${req.headers.host}/confirmar/${email}`;

        await enviarEmail.enviar({
            user,
            subject: 'Activar cuenta',
            confirURL,
            archivo: 'confirmUser'
        });

        req.flash('correcto', 'Verifica tu casilla de email')
        res.redirect('/iniciar-sesion');

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

exports.reestablecerPassword = (req, res) => {
    res.render('user/reestablecer', { title: "Restablecer contraseña" });
}

exports.activarCuenta = async (req, res) => {
    const user = await User.findOne({ where: { email: req.params.email } })

    user.status = 1;
    user.save()

    req.flash('correcto', 'Tu cuenta fue activada correctamente')
    res.redirect('/iniciar-sesion');
}