const express = require('express');
const { body } = require('express-validator');
const { route } = require('express/lib/application');
const router = express.Router();

const validation = body('name').not().isEmpty().trim().escape();

const homeController = require('../controllers/homeController');
const taskController = require('../controllers/taskController');

module.exports = function () {
    router.get('/', homeController.index)

    //Rutas  de proyecto
    router.get('/newProyect', homeController.newProyect)
    router.post('/newProyect', validation, homeController.addProyect)
    router.get('/proyects/:url', homeController.showProyect)
    router.get('/proyect/:id/edit', homeController.editProyect)
    router.post('/newProyect/:id', validation, homeController.updateProyect)
    router.delete('/proyect/:url', homeController.deleteProyect);

    router.post('/proyects/:url', taskController.addTask);

    return router;
}