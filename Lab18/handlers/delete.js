const url = require('url')
const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('../orm').ORM(sequelize)
module.exports = (req, res) => {
    let rurl = url.parse(req.url).pathname
    let path = rurl.split('/api/')[1].split('/')[0]
    let code = rurl.split('/api/')[1].split('/')[1]
    code = decodeURI(code)
    if(path == 'faculties') {
        Faculty.findOne({where:{faculty:code}})
        .then(result => {
            Faculty.destroy({where:{faculty:code}})
            .then(result2 => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(result))})
            .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
        })
        
    } else if(path == 'pulpits') {
        Pulpit.findOne({where:{pulpit:code}})
        .then(result => {
            Pulpit.destroy({where:{pulpit:code}})
            .then(result2 => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(result))})
            .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
        })
        
    } else if(path == 'subjects') {
        Subject.findOne({where:{subject:code}})
        .then(result => {
            Subject.destroy({where:{subject:code}})
            .then(result2 => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(result))})
            .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
        })
    } else if(path == 'auditoriumtypes') {
        Auditorium_type.findOne({where:{auditorium_type:code}})
        .then(result => {
            Auditorium_type.destroy({where:{auditorium_type:code}})
            .then(result2 => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(result))})
            .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
        })
    } else if(path == 'auditoriums') {
        Auditorium.findOne({where:{auditorium:code}})
        .then(result => {
            Auditorium.destroy({where:{auditorium:code}})
            .then(result2 => {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify(result))})
            .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
        })
    }
}