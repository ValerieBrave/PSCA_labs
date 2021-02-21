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
            if(result != null) {
                Faculty.destroy({where:{faculty:code}})
                .then(result2 => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(result))})
                .catch(err => {res.writeHead(500); res.end(JSON.stringify({err: err.message}))})
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: 'faculty not found'}))
            }
            
        })
        
    } else if(path == 'pulpits') {
        Pulpit.findOne({where:{pulpit:code}})
        .then(result => {
            if(result != null) {
                Pulpit.destroy({where:{pulpit:code}})
                .then(result2 => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(result))})
                .catch(err => {res.writeHead(500); res.end(JSON.stringify({err: err.message}))})
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: 'pulpit not found'}))
            }
        })
        
    } else if(path == 'subjects') {
        Subject.findOne({where:{subject:code}})
        .then(result => {
            if(result != null) {
                Subject.destroy({where:{subject:code}})
                .then(result2 => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(result))})
                .catch(err => {res.writeHead(500); res.end(JSON.stringify({err: err.message}))})
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: 'subject not found'}))
            }
        })
    } else if(path == 'auditoriumtypes') {
        Auditorium_type.findOne({where:{auditorium_type:code}})
        .then(result => {
            if(result != null) {
                Auditorium_type.destroy({where:{auditorium_type:code}})
                .then(result2 => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(result))})
                .catch(err => {res.writeHead(500); res.end(JSON.stringify({err: err.message}))})
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: 'auditorium type not found'}))
            }
        })
    } else if(path == 'auditoriums') {
        Auditorium.findOne({where:{auditorium:code}})
        .then(result => {
            if(result != null) {
                Auditorium.destroy({where:{auditorium:code}})
                .then(result2 => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    res.end(JSON.stringify(result))})
                .catch(err => {res.writeHead(500); res.end(JSON.stringify({err: err.message}))})
            } else {
                res.writeHead(500, {'Content-Type': 'application/json; charset=utf-8'})
                res.end(JSON.stringify({err: 'auditorium not found'}))
            }
        })
    }
}