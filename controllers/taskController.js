const Proyect = require('../models/Proyect');
const Task = require('../models/Task');

exports.addTask = async (req, res, next) => {
    const proyect = await Proyect.findOne({ where: { url: req.params.url } })
    const { task } = req.body;
    const status = 0;
    const proyectId = proyect.id;

    const result = await Task.create({ task, status, proyectId });

    !result ? next() : '';

    res.redirect(`/proyects/${req.params.url}`);
}