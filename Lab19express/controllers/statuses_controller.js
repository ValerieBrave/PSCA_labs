const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let statuses = await Job_status.findAll()
    res.render('status.hbs', {layout: false, data: statuses})
}
exports.add = async function (req, res) {
    Job_status.create({status:req.body.status})
    .then( (result) =>  {
        Job_status.findAll()
        .then(result2 => {
            res.render('status.hbs', {layout: false, data: result2, mes: "Status succesfully added"})
        })
    })
    .catch( (err) => {
        Job_status.findAll()
        .then(result2 => {
            res.render('status.hbs', {layout: false, data: result2, err: err.message})
        }) 
    })
}
exports.delete = async function (req, res) {
    Job_status.destroy({where:{status:req.params.parm}})
    .then(result => {
        if(result != 1) mes = "Status not found"
        else mes = "Status succesfully deleted"
        Job_status.findAll()
        .then(result2 => {
            res.render('status.hbs', {layout: false, data: result2, mes: mes})
        })
    })
    .catch(err => {
        Job_status.findAll()
        .then(result2 => {
            res.render('status.hbs', {layout: false, data: result2, err: err.message})
        }) 
    })
}