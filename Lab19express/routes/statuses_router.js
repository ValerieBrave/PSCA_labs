const express = require('express')

var statController = require('../controllers/statuses_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', statController.getAll)
    return router
}