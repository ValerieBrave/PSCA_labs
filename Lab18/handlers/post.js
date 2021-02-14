const url = require('url')
const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('../orm').ORM(sequelize)
module.exports = (req, res, body) => {
    let rurl = url.parse(req.url).pathname
    if(rurl == '/api/faculties') {
        Faculty.create({faculty: body.faculty, faculty_name: body.faculty_name})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(body))})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/pulpits') {
        Pulpit.create({pulpit: body.pulpit, pulpit_name: body.pulpit_name, faculty: body.faculty})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(body))})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/subjects') {
        Subject.create({subject: body.subject,subject_name: body.subject_name,pulpit: body.pulpit})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(body))})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/auditoriumtypes') {
        Auditorium_type.create({auditorium_type:body.auditorium_type,auditorium_typename:body.auditorium_typename})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(body))})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    } else if(rurl == '/api/auditoriums') {
        Auditorium.create({
            auditorium: body.auditorium,
            auditorium_name: body.auditorium_name,
            auditorium_capacity: body.auditorium_capacity,
            auditorium_type: body.auditorium_type})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(body))})
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(err))})
    }
}