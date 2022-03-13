const Sequelize = require('sequelize');
const db = require('../config/db');

const Proyect = db.define('proyects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),
    url: Sequelize.STRING(150)
});

module.exports = Proyect;