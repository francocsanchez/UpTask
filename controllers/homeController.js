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
    const proyectsPromisse = Proyect.findAll();
    const proyectPromisse = Proyect.findOne({ where: { url: req.params.url } })
    const [proyects, proyect] = await Promise.all([proyectsPromisse, proyectPromisse])

    res.render('./home/proyect', { title: 'Proyecto', proyects, proyect })
}

exports.editProyect = async (req, res) => {
    const proyectsPromisse = Proyect.findAll();
    const proyectPromisse = Proyect.findOne({ where: { id: req.params.id } })
    const [proyects, proyect] = await Promise.all([proyectsPromisse, proyectPromisse])
    res.render('./home/newProyect', { title: 'Editar proyecto', proyects, proyect })
}

exports.updateProyect = async (req, res) => {
    const proyects = await Proyect.findAll();
    const { name } = req.body

    let errors = [];
    if (!name) { errors.push({ 'texto': 'Agregar un nombre' }) }

    if (errors.length > 0) {
        res.render('./home/newProyect', { title: 'Editar proyecto', errors, proyects })
    } else {
        await Proyect.update({ name }, { where: { id: req.params.id } });
        res.redirect('/');
    }
}

exports.deleteProyect = async (req, res, next) => {
    const { urlProyect } = req.query;
    const result = await Proyect.destroy({ where: { url: urlProyect } });

    !result ? next() : res.status(200).send('Proyecto eliminado correctamente');
}