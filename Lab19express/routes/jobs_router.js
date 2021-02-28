const express = require('express')

var jobsController = require('../controllers/jobs_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', jobsController.getAll)
    router.post('/add', jobsController.add)
    router.delete('/delete/:parm', jobsController.delete)
    router.put('/edit', jobsController.edit)
    return router
}
