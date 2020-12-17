const url = require("url")
const fs = require("fs")
const sql = require('mssql')

module.exports = (req, res, pool) => {
    if (url.parse(req.url).pathname == '/') {
        let html = fs.readFile("./index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
          })
    }
    else if(url.parse(req.url).pathname == '/api/faculties') {
        pool.request().query("select * from faculty", (err, result) => {
            if (err) res.writeHead(500, err.message);
            else {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result.recordset))
            }
          })
    }
    else if(url.parse(req.url).pathname == '/api/pulpits') {
        pool.request().query("select * from pulpit", (err, result) => {
            if (err) res.writeHead(500, err.message);
            else {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result.recordset))
            }
          })
    }
    else if(url.parse(req.url).pathname == '/api/subjects') {
        pool.request().query("select * from subject", (err, result) => {
            if (err) res.writeHead(500, err.message);
            else {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result.recordset))
            }
          })
    }
    else if(url.parse(req.url).pathname == '/api/auditoriumtypes') {
        pool.request().query("select * from AUDITORIUM_TYPE", (err, result) => {
            if (err) res.writeHead(500, err.message);
            else {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result.recordset))
            }
          })
    }
    else if(url.parse(req.url).pathname == '/api/auditoriums') {
        pool.request().query("select * from AUDITORIUM", (err, result) => {
            if (err) res.writeHead(500, err.message);
            else {
              res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
              });
              res.end(JSON.stringify(result.recordset))
            }
          })
    }
}