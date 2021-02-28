const express = require('express')

var teamController = require('../controllers/teams_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', teamController.getAll)
    router.post('/add', teamController.add)
    router.delete('/delete/:parm', teamController.delete)
    router.put('/edit', teamController.edit)
    return router
}