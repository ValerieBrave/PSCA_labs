const express = require('express')

var jobsController = require('../controllers/jobs_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', jobsController.getAll)
    return router
}
