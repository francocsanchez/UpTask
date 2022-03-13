const { Sequelize } = require('sequelize');

const db = new Sequelize('uptask', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;