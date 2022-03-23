const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyect = require('./Proyect');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: { type: Sequelize.STRING(60), allowNull: false },
    password: { type: Sequelize.STRING(60), allowNull: false }
});

User.hasMany(Proyect);

module.exports = User;