const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let teams = await Team.findAll()
    res.render('team.hbs', {layout: false, data: teams})
}
exports.add = async function (req, res) {
    global.sequelize.query("insert into team(lead_name, department, members) values('"+
    req.body.lead_name+"','"+req.body.department+"',"+req.body.members+')',{type: global.sequelize.QueryTypes.INSERT})
    .then(result => {
        Team.findAll()
         .then(result2 => {
             res.render('team.hbs', {layout: false, data: result2, mes: "Team succesfully added"})
         })
    })
    .catch(err => {
        Team.findAll()
        .then(result2 => {
            res.render('team.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.delete = async function (req, res) {
    Team.destroy({where:{team_id: req.params.parm}})
    .then(result => {
        if(result != 1) mes = "Team not found"
        else mes = "Team succesfully deleted"
        Team.findAll()
        .then(result2 => {
            res.render('team.hbs', {layout: false, data: result2, mes: mes})
        })
    })
    .catch(err => {
        Team.findAll()
        .then(result2 => {
            res.render('team.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.edit = async function (req, res) {
    //console.log(req.body)
    Team.update({lead_name: req.body.lead_name, department: req.body.department, members: req.body.members},
        {where: {team_id:req.body.team_id}})
    .then(result => {
        if(result[0] != 0) {    //OK
            Team.findAll()
            .then(result2 => {
                res.render('team.hbs', {layout: false, data: result2, mes: "Team successfully edited"})
            })
        } else {
            Team.findAll()
            .then(result2 => {
                res.render('team.hbs', {layout: false, data: result2, err: "Team not found"})
            })
        }
    })
    .catch(err => {
        Team.findAll()
        .then(result2 => {
            res.render('team.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}