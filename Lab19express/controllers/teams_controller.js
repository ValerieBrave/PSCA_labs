const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let teams = await Team.findAll()
    res.render('team.hbs', {layout: false, data: teams})
}