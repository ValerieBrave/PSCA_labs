const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let jobs = await Job.findAll()
    res.render('job.hbs', {layout: false, data: jobs})
}