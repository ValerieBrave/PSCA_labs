const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let jobs = await Job.findAll()
    res.render('job.hbs', {layout: false, data: jobs})
}
exports.add = async function (req, res) {
    global.sequelize.query("insert into job(status, emp_name, job_title, job_start) values('"+
    req.body.status+"','"+req.body.emp_name+"','"+req.body.job_title+"','"+req.body.job_start+"')")
    .then(result => {
        Job.findAll()
        .then(result2 => {
            res.render('job.hbs', {layout: false, data: result2, mes: "Job successfully added"})
        })
    })
    .catch(err => {
        Job.findAll()
        .then(result2 => {
            res.render('job.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.delete = async function (req, res) {
    Job.destroy({where:{job_id:req.params.parm}})
    .then(result => {
        if(result != 1) mes = "Job not found"
        else mes = "Job succesfully deleted"
        Job.findAll()
        .then(result2 => {
            res.render('job.hbs', {layout: false, data: result2, mes: mes})
        })
    })
    .catch(err => {
        Job.findAll()
        .then(result2 => {
            res.render('job.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.edit = async function (req, res) {
    Job.update({job_title: req.body.job_title, status: req.body.status, emp_name: req.body.emp_name}, 
        {where:{job_id:req.body.job_id}})
    .then(result => {
        if(result[0] != 0) {    //OK
            Job.findAll()
            .then(result2 => {
                res.render('job.hbs', {layout: false, data: result2, mes: "Job successfully edited"})
            })
        } else {
            Job.findAll()
            .then(result2 => {
                res.render('job.hbs', {layout: false, data: result2, err: "Job not found"})
            })
        }
    })
    .catch(err => {
        Job.findAll()
        .then(result2 => {
            res.render('job.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}