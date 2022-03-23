const express = require('express');
const { body } = require('express-validator');
const { route } = require('express/lib/application');
const router = express.Router();

const validation = body('name').not().isEmpty().trim().escape();

const proyectController = require('../controllers/proyectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

module.exports = function () {
    router.get('/', proyectController.index)

    //Rutas de proyecto
    router.get('/proyect/add', proyectController.newProyect)
    router.post('/proyect/add', validation, proyectController.addProyect)
    router.get('/proyects/:url', proyectController.showProyect)
    router.get('/proyect/:id/edit', proyectController.editProyect)
    router.post('/proyect/add/:id', validation, proyectController.updateProyect)
    router.delete('/proyect/:url', proyectController.deleteProyect);

    //Rutas de tareas
    router.post('/task/:url', taskController.addTask);
    router.patch('/task/:id', taskController.updateTask);
    router.delete('/task/:id', taskController.deleteTask);

    //Rutas de Usuario
    router.get('/crear-cuenta', userController.formLogin);
    router.post('/crear-cuenta', userController.crearCuenta);

    return router;
}