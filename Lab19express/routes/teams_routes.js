const express = require('express')

var teamController = require('../controllers/teams_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', teamController.getAll)
    return router
}