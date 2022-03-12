const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

module.exports = function () {
    router.get('/', homeController.index)

    return router;
}