const User = require('../models/User');
const Proyect = require('../models/Proyect');
const Task = require('../models/Task');
const faker = require('faker');

exports.faker = async (req, res) => {
    for (i = 1; i < 3; i++) {
        let randomEmail = faker.internet.email();
        let randomPassword = faker.name.findName();
        let result = await User.create({ email: randomEmail, password: randomPassword, status: 1 })
    }

    for (p = 1; p < 3; p++) {
        let randomUrl = faker.internet.url();
        let randomName = faker.name.findName();
        let result = await Proyect.create({ name: randomName, url: randomUrl, userId: p })
    }

    for (t = 1; t < 3; t++) {
        for (p = 0; p < 5; p++) {
            let randomTask = faker.vehicle.vehicle();
            let randomStatus = faker.datatype.boolean();
            let result = await Task.create({ task: randomTask, status: randomStatus, proyectId: t })
        }
    }

    res.send('Datos creados');
}