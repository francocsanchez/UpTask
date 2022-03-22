const Proyect = require('../models/Proyect');
const Task = require('../models/Task');

exports.addTask = async (req, res, next) => {
    const proyect = await Proyect.findOne({ where: { url: req.params.url } })
    const { task } = req.body;
    const status = 0;
    const proyectId = proyect.id;

    const result = await Task.create({ task, status, proyectId });

    !result ? next() : res.redirect(`/proyects/${req.params.url}`);
}

exports.updateTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findOne({ where: { id } })
    const resetStatus = 0;
    task.status == resetStatus ? task.status = 1 : task.status = 0;

    const result = await task.save();

    !result ? next() : res.status(200).send('Actualizado');
}

exports.deleteTask = async (req, res) => {

    const { id } = req.params;
    const result = Task.destroy({ where: { id } })

    !result ? next() : res.status(200).send('Tarea eliminada correctamente');
}