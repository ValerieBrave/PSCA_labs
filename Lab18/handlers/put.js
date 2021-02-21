const url = require('url')
const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('../orm').ORM(sequelize)
module.exports = (req, res, body) => {
    let rurl = url.parse(req.url).pathname
    if(rurl == '/api/faculties') {
        Faculty.update({ faculty_name: body.faculty_name },{where: {faculty: body.faculty}})
        .then(result => {
            if(result[0] != 0) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(body))
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: "faculty not found"}))
            }})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/pulpits') {
        Pulpit.update({ pulpit_name:body.pulpit_name,faculty:body.faculty},{where:{ pulpit: body.pulpit}})
        .then(result => {
            if(result[0] != 0) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(body))
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: "pulpit not found"}))
            }
            })
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/subjects') {
        Subject.update({ subject_name:body.subject_name, pulpit:body.pulpit }, {where:{subject: body.subject}})
        .then(result => {
            if(result[0] != 0) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(body))
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: "subject not found"}))
            }})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/auditoriumtypes') {
        Auditorium_type.update({ auditorium_typename: body.auditorium_typename }, {where: {auditorium_type: body.auditorium_type}})
        .then(result => {
            if(result[0] != 0) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(body))
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: "auditorium type not found"}))
            }})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/auditoriums') {
        Auditorium.update({ auditorium_name: body.auditorium_name, auditorium_capacity: body.auditorium_capacity, 
                            auditorium_type: body.auditorium_type }, {where: {auditorium: body.auditorium}})
        .then(result => {
            if(result[0] != 0) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(body))
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: "auditorium not found"}))
            }})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    }
}