const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let employees = await Employee.findAll()
    res.render('employee.hbs', {layout: false, data: employees})
}