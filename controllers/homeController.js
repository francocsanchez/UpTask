exports.index = (req, res) => {
    res.render('./home/index', { title: 'Home' })
}

exports.newProyect = (req, res) => {
    res.render('./home/newProyect', { title: 'Nuevo Proyecto' })
}

exports.addProyect = (req,res)  => {
    console.log(req.body);
}