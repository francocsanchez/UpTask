exports.index = (req, res) => {
    res.render('./home/index', { title: 'Home' })
}

exports.newProyect = (req, res) => {
    res.render('./home/newProyect', { title: 'Nuevo Proyecto' })
}