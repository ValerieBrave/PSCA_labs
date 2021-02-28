const express = require('express')

var empController = require('../controllers/employees_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', empController.getAll)
    router.post('/add', empController.add)
    router.delete('/delete/:parm', empController.delete)
    router.put('/edit', empController.edit)
    return router
}