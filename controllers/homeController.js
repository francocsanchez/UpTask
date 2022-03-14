const Proyect = require('../models/Proyect');

exports.index = async (req, res) => {
    const proyects = await Proyect.findAll();
    res.render('./home/index', { title: 'Home', proyects })
}

exports.newProyect = async (req, res) => {
    const proyects = await Proyect.findAll();
    res.render('./home/newProyect', { title: 'Nuevo Proyecto', proyects })
}

exports.addProyect = async (req, res) => {
    const proyects = await Proyect.findAll();
    const { name } = req.body

    let errors = [];
    if (!name) { errors.push({ 'texto': 'Agregar un nombre' }) }

    if (errors.length > 0) {
        res.render('./home/newProyect', { title: 'Nuevo Proyecto', errors, proyects })
    } else {
        const proyect = await Proyect.create({ name });
        res.redirect('/');
    }
}

exports.showProyect = async (req, res) => {
    const proyects = await Proyect.findAll();
    const proyect = await Proyect.findOne({ where: { url: req.params.url } })
    res.render('./home/proyect', { title: 'Proyecto', proyects, proyect })
}