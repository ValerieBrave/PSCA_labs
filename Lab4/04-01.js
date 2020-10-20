var http = require('http')
var url = require('url')
var fs = require('fs')
var data = require('./db_module')

var db = new data.DB()

db.on('GET', (req, res) => {res.end(JSON.stringify(db.get()))})
db.on('POST',(req, res) => {
                            req.on('data', data => {
                                                    let r = JSON.parse(data)
                                                    db.post(r);
                                                    res.end(JSON.stringify(r))
                                                    })
                            })
db.on('PUT', (req, res) => {
                            req.on('data', data => {
                                                    let r = JSON.parse(data)
                                                    db.put(r)
                                                    res.end(JSON.stringify(r))
                                                    })
                            })
db.on('DELETE', (req, res) => {
                                id = parseInt(url.parse(req.url, true).query['id'])
                                if(id != 'undefined') {
                                    db.delete(id)
                                    res.end(id.toString());
                                }
                            })


http.createServer(function (request, response) {
    if(url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./04-01.html')
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        response.end(html)
    }
    else if(url.parse(request.url).pathname === '/api/db') {

        console.log(url.parse(request.url).pathname+"=pathname");
        db.emit(request.method, request, response)
    }
}).listen(3000);