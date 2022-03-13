const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

module.exports = function () {
    router.get('/', homeController.index)

    //Rutas de creacion de proyecto
    router.get('/newProyect', homeController.newProyect)
    router.post('/newProyect', homeController.addProyect)
    
    return router;
}