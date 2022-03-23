const User = require('../models/User');
const Proyect = require('../models/Proyect');
const Task = require('../models/Task');
const faker = require('faker');

exports.faker = async (req, res) => {
    for (i = 1; i < 3; i++) {
        let randomEmail = faker.internet.email();
        let randomPassword = faker.name.findName();
        let result = await User.create({ email: randomEmail, password: randomPassword })

        for (p = 1; p < 3; p++) {
            let randomUrl = faker.internet.url();
            let randomName = faker.name.findName();
            let result = await Proyect.create({ name: randomName, url: randomUrl, userId: i })

            for (t = 0; t <= 6; t++) {
                let randomTask = faker.vehicle.vehicle();
                let randomStatus = faker.datatype.boolean();
                let result = await Task.create({ task: randomTask, status: randomStatus, proyectId: p })
            }
        }
    }
    res.send('Datos creados');
}