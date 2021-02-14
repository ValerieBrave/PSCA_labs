const url = require('url');
const fs = require('fs');
const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('../orm').ORM(sequelize)

module.exports = (req, res) => {
    let rurl = url.parse(req.url).pathname
    //sequelize.sync()
    if(rurl == '/') {
        let html = fs.readFile("./index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
          })
    } else if(rurl == '/api/faculties') {
        Faculty.findAll().then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get faculties list error')})
    } else if(rurl == '/api/pulpits') {
        Pulpit.findAll().then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get pulpits list error')});
    } else if(rurl == '/api/subjects') {
        Subject.findAll().then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get subjects list error')})
    } else if(rurl == '/api/auditoriumtypes') {
        Auditorium_type.findAll().then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get auditorium types list error')})
    } else if(rurl == '/api/auditoriums') {
        Auditorium.findAll().then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get auditoriums list error')})
    } else if(rurl.includes('/api/faculties/') && rurl.includes('/pulpits')) {
        let reg = rurl.split('/api/faculties/')[1].split('/')[0]
        reg = decodeURI(reg)    //постман кодирует урл с русскими символами((
        Faculty.findAll({
            include: [{
                where:{faculty:reg},
                model:Pulpit,
                as: 'faculty_pulpits'
            }]
           
        }).then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get faculty pulpits list error')})
    } else if(rurl.includes('/api/faculties/') && rurl.includes('/teachers')) {
        let reg = rurl.split('/api/faculties/')[1].split('/')[0]
        reg = decodeURI(reg)
        Faculty.findAll({
            include:
            [
                {
                    where:{faculty:reg},
                    model: Pulpit,
                    as: 'faculty_pulpits',
                    include:[{model: Teacher, as: 'pulpit_teacher'}]
                }
            ]                    
        }).then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result));
        }).catch(err => {res.writeHead(500); res.end('get faculty teachers list error')})
    } else if(rurl == '/api/auditoriumsgt60') {
        Auditorium.scope('auditoriumsMore').findAll()
        .then(result => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
        })
        .catch(err => {res.writeHead(500); res.end(JSON.stringify(err))})
    }
}