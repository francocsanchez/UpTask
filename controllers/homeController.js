exports.index = (req, res) => {
    res.render('./home/index', { title: 'Home' })
}

exports.newProyect = (req, res) => {
    res.render('./home/newProyect', { title: 'Nuevo Proyecto' })
}

exports.addProyect = (req, res) => {
    const { name } = req.body

    let errors = [];
    if (!name) { errors.push({ 'texto': 'Agregar un nombre' }) }

    if (errors.length > 0) {
        res.render('./home/newProyect', { title: 'Nuevo Proyecto', errors })
    }
}