const express = require('express')

var empController = require('../controllers/employees_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', empController.getAll)
    return router
}