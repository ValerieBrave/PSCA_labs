const express = require('express')

var homeController = require('../controllers/home_controller')

module.exports = () => {
    var router = express.Router()
    router.get('/index', homeController.index)
    return router
}