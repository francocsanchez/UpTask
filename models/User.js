const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyect = require('./Proyect');
const bcrypt = require('bcrypt-nodejs')

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agregar un correo valido'
            },
            notEmpty: {
                msg: 'El campo email no debe estar vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Email ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo password no debe estar vacio'
            }
        }
    },
    token: {
        type: Sequelize.STRING
    },
    tokenExp: {
        type: Sequelize.DATE
    }
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

User.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

User.hasMany(Proyect);

module.exports = User;