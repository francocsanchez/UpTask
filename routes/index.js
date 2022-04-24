const express = require('express');
const { body } = require('express-validator');
const { route } = require('express/lib/application');
const router = express.Router();

const validation = body('name').not().isEmpty().trim().escape();

const proyectController = require('../controllers/proyectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const fakerController = require('../controllers/fakerController');
const authController = require('../controllers/authController');

module.exports = function () {
    router.get('/', authController.usuarioAutenticado, proyectController.index)

    //Rutas de proyecto
    router.get('/proyect/add', authController.usuarioAutenticado, proyectController.newProyect)
    router.post('/proyect/add', authController.usuarioAutenticado, validation, proyectController.addProyect)
    router.get('/proyects/:url', authController.usuarioAutenticado, proyectController.showProyect)
    router.get('/proyect/:id/edit', authController.usuarioAutenticado, proyectController.editProyect)
    router.post('/proyect/add/:id', authController.usuarioAutenticado, validation, proyectController.updateProyect)
    router.delete('/proyect/:url', authController.usuarioAutenticado, proyectController.deleteProyect);

    //Rutas de tareas
    router.post('/task/:url', authController.usuarioAutenticado, taskController.addTask);
    router.patch('/task/:id', authController.usuarioAutenticado, taskController.updateTask);
    router.delete('/task/:id', authController.usuarioAutenticado, taskController.deleteTask);

    //Rutas de Usuario
    router.get('/crear-cuenta', userController.formLogin);
    router.post('/crear-cuenta', userController.crearCuenta);
    router.get('/iniciar-sesion', userController.iniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    router.get('/cerrar-sesion', authController.cerrarSesion);
    router.get('/reestablecer', userController.reestablecerPassword);
    router.post('/reestablecer', authController.generarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);
    router.get('/confirmar/:email', userController.activarCuenta);

    //Faker
    router.get('/faker', fakerController.faker);

    return router;
}