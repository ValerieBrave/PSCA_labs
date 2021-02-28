const express = require('express')

var statController = require('../controllers/statuses_controller')
module.exports = () => {
    var router = express.Router()
    router.get('/', statController.getAll)
    router.post('/add', statController.add)
    router.delete('/delete/:parm', statController.delete)
    return router
}