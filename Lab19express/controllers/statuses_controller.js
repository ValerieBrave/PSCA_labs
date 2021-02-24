const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let statuses = await Job_status.findAll()
    res.render('status.hbs', {layout: false, data: statuses})
}