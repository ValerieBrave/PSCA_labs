const url = require("url")
const fs = require("fs")
const sql = require('mssql')

module.exports = (req, res, pool) => {
    if(url.parse(req.url).pathname.includes('/api/faculties')) {
        console.log(url.parse(req.url).pathname.split('/'))
        const ps = new sql.PreparedStatement(pool)
        ps.input("faculty", sql.Char(10))
        ps.prepare("delete faculty where faculty like @faculty", (err, result) => {
            if(err) res.writeHead(500, err.message)
            else { 
                ps.execute({faculty: url.parse(req.url).pathname.split('/')[3]}, (err, result) =>{
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json; charset=utf-8"
                          });
                          res.end(JSON.stringify({
                            rowsAffected: result.rowsAffected[0].toString(),
                          }));
                    }
                })
            }
        })  
    } 
    else if(url.parse(req.url).pathname.includes('/api/pulpits')) {
        const ps = new sql.PreparedStatement(pool);
        ps.input("pulpit", sql.Char(10))
        ps.prepare("delete pulpit where pulpit = @pulpit", (err, result) => {
            if(err) res.writeHead(500, err.message)
            else {
                ps.execute({pulpit: url.parse(req.url).pathname.split('/')[3]}, (err, result) => {
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json;"
                          });
                          res.end(JSON.stringify({
                            rowsAffected: result.rowsAffected[0].toString(),
                          }));
                    }
                })
            }
        })
    }
    else if(url.parse(req.url).pathname.includes('/api/subjects')) {
        const ps = new sql.PreparedStatement(pool);
        ps.input("subject", sql.Char(10))
        ps.prepare("delete subject where subject = @subject", (err, result) => {
            if(err) res.writeHead(500, err.message)
            else {
                ps.execute({subject: url.parse(req.url).pathname.split('/')[3]}, (err, result) => {
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json;"
                          });
                          res.end(JSON.stringify({
                            rowsAffected: result.rowsAffected[0].toString()
                          }));
                    }
                })
            }
        })
    }
    else if(url.parse(req.url).pathname.includes('/api/auditoriumstypes')) {
        pool
          .request()
          .input("auditorium_type", sql.Char(10), url.parse(req.url).pathname.split('/')[3])
          .query("delete auditorium_type where auditorium_type = @auditorium_type", (err, result) =>{
            if (err) res.writeHead(500, err.message)
            else {
              res.writeHead(200, {"Content-Type": "application/json; "});
              res.end(JSON.stringify({
                rowsAffected: result.rowsAffected[0].toString()
              }));
            }
          })
    }
    else if(url.parse(req.url).pathname.includes('/api/auditoriums')) {
        pool
        .request()
        .input("auditorium", sql.Char(10), url.parse(req.url).pathname.split('/')[3])
        .query("delete auditorium where auditorium = @auditorium", (err, result) => {
            if (err) res.writeHead(500, err.message)
            else {
              res.writeHead(200, {"Content-Type": "application/json; "});
              res.end(JSON.stringify({
                rowsAffected: result.rowsAffected[0].toString()
              }));
            }
        })
    }
}