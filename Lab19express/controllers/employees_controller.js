const {Job_status, Team, Employee, Job} = require('../models/orm').ORM()

exports.getAll = async function (req, res) {
    let employees = await Employee.findAll()
    res.render('employee.hbs', {layout: false, data: employees})
}
exports.add = async function (req, res) {
    global.sequelize.query("insert into employee(emp_name, position, team_id) values('"+
    req.body.emp_name+"','"+req.body.position+"',"+req.body.team_id+')',{type: global.sequelize.QueryTypes.INSERT})
    //Employee.create({emp_name: req.body.emp_name, position: req.body.position, team_id: req.body.team_id})
    .then(result => {
        Employee.findAll()
        .then(result2 => {
            res.render('employee.hbs', {layout: false, data: result2, mes: "Employee successfully added"})
        })
    })
    .catch(err => {
        Employee.findAll()
        .then(result2 => {
            res.render('employee.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.delete = async function (req, res) {
    Employee.destroy({where:{emp_name:req.params.parm}})
    .then(result => {
        if(result != 1) mes = "Employee not found"
        else mes = "Employee succesfully deleted"
        Employee.findAll()
        .then(result2 => {
            res.render('employee.hbs', {layout: false, data: result2, mes: mes})
        })
    })
    .catch(err => {
        Employee.findAll()
        .then(result2 => {
            res.render('employee.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}
exports.edit = async function (req, res) {
    Employee.update({position:req.body.position, team_id:req.body.team_id},
        {where:{emp_name:req.body.emp_name}})
    .then(result => {
        if(result[0] != 0) {    //OK
            Employee.findAll()
            .then(result2 => {
                res.render('employee.hbs', {layout: false, data: result2, mes: "Employee successfully edited"})
            })
        } else {
            Employee.findAll()
            .then(result2 => {
                res.render('employee.hbs', {layout: false, data: result2, err: "Employee not found"})
            })
        }
    })
    .catch(err => {
        Employee.findAll()
        .then(result2 => {
            res.render('employee.hbs', {layout: false, data: result2, err: err.message})
        })
    })
}