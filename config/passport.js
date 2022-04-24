const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const enviarEmail = require('../handlers/email')

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await User.findOne({
                    where: { email: email }
                });

                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'El password es incorrecto'
                    })
                }

                if (usuario.status == 0) {
                    return done(null, false, {
                        message: 'La cuenta no se encuentra activa, verifica tu correo'
                    })
                }

                return done(null, usuario)
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
)

passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;