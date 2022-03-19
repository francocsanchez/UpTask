const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyect = require('./Proyect');

const Task = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING(60),
    status: Sequelize.STRING(150)
});
Task.belongsTo(Proyect);

module.exports = Task;