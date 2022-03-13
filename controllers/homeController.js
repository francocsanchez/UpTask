const Proyect = require('../models/Proyect');

exports.index = (req, res) => {
    res.render('./home/index', { title: 'Home' })
}

exports.newProyect = (req, res) => {
    res.render('./home/newProyect', { title: 'Nuevo Proyecto' })
}

exports.addProyect = async (req, res) => {
    const { name } = req.body

    let errors = [];
    if (!name) { errors.push({ 'texto': 'Agregar un nombre' }) }

    if (errors.length > 0) {
        res.render('./home/newProyect', { title: 'Nuevo Proyecto', errors })
    } else {
        const proyect = await Proyect.create({ name });
        res.redirect('/');
    }
}