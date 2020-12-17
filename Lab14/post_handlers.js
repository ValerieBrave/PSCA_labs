const url = require("url")
const fs = require("fs")
const sql = require('mssql')

module.exports = (req, res, data, pool) => {
    if(url.parse(req.url).pathname == '/api/faculties') {
        const ps = new sql.PreparedStatement(pool);
        ps.input("faculty", sql.VarChar);
        ps.input("faculty_name", sql.VarChar);
        ps.prepare("insert into faculty(faculty, faculty_name) values(@faculty, @faculty_name)", (err, result) =>{
            if(err) res.writeHead(500, err.message)
            else {
                ps.execute({faculty: data.faculty, faculty_name: data.faculty_name }, (err, result) => {
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json;",
                          });
                          res.end(JSON.stringify(data));
                    }
                })
            }
        })
    }
    else if(url.parse(req.url).pathname == '/api/pulpits') {
        const ps = new sql.PreparedStatement(pool);
        ps.input("pulpit", sql.Char(10));
        ps.input("pulpit_name", sql.VarChar);
        ps.input("faculty", sql.VarChar);
        ps.prepare("insert into PULPIT(PULPIT,PULPIT_NAME,FACULTY)  values(@pulpit, @pulpit_name, @faculty);", (err, result) => {
            if(err) res.writeHead(500, err.message)
            else {
                ps.execute({pulpit: data.pulpit, pulpit_name:data.pulpit_name, faculty:data.faculty}, (err, result) => {
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json;"
                          });
                          res.end(JSON.stringify(data));
                    }
                })
            }
        })
    }
    else if(url.parse(req.url).pathname == '/api/subjects') {
        const ps = new sql.PreparedStatement(pool);
        ps.input("subject", sql.Char(10));
        ps.input("subject_name", sql.VarChar);
        ps.input("pulpit", sql.Char(10));
        ps.prepare("insert into subject(subject,subject_name, pulpit)  values(@subject, @subject_name, @pulpit);", (err, result) => {
            if(err) res.writeHead(500, err.message)
            else {
                ps.execute({subject: data.subject, subject_name: data.subject_name, pulpit: data.pulpit}, (err, result) => {
                    if(err) res.writeHead(500, err.message)
                    else {
                        res.writeHead(200, {
                            "Content-Type": "application/json;"
                          });
                          res.end(JSON.stringify(data));
                    }
                })
            }
        })
    }
    else if(url.parse(req.url).pathname == '/api/auditoriumstypes') {
        pool
          .request()
          .input("auditorium_type", sql.Char(10), data.auditorium_type)
          .input("auditorium_typename", sql.VarChar, data.auditorium_typename)
          .query(
            "insert into auditorium_type(auditorium_type, auditorium_typename) values(@auditorium_type, @auditorium_typename)",
            (err, result) => {
              if (err) res.writeHead(500, err.message)
              else {
                res.writeHead(200, {"Content-Type": "application/json; "});
                res.end(JSON.stringify(data));
              }
            }
          );
    }
    else if(url.parse(req.url).pathname == '/api/auditoriums') {
        pool
          .request()
          .input("auditorium", sql.Char(10), data.auditorium)
          .input("auditorium_name", sql.VarChar, data.auditorium_name)
          .input("auditorium_capacity", sql.Int, data.auditorium_capacity)
          .input("auditorium_type", sql.Char(10), data.auditorium_type)
          .query(
            "insert into auditorium(auditorium, auditorium_name, auditorium_capacity, auditorium_type) values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)",
            (err, result) => {
              if (err) res.writeHead(500, err.message)
              else {
                res.writeHead(200, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(data));
              }
            }
          );
    } 
}