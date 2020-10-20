var http = require('http')
var url = require('url')
var fs = require('fs')
var data = require('./05module.js')

var db = new data.DB()
var stat = {begin: null, commits: null, end: null};
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
db.on('COMMIT', () => {db.commit(); console.log(`DB commit No ${db.commits}`); stat.commits = db.commits; })



var server = http.createServer(function (request, response) {
    if(url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./05-01.html')
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        response.end(html)
    }
    else if(url.parse(request.url).pathname === '/api/db') {

        console.log(url.parse(request.url).pathname+"=pathname");
        db.emit(request.method, request, response)
    }
    else if(url.parse(request.url).pathname === '/api/ss') {
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(stat));
    }
}).listen(3000);

process.stdin.setEncoding('utf-8');

var stop = null;
var statistics_handle = null;
var commit = null;
var start_statistics = () => {}

process.stdin.on('readable', ()=> {
    let chunk = null;
    while((chunk = process.stdin.read()) != null) {
        if (chunk.split(' ')[0] == 'sd') {
            if(stop == null && chunk.split(' ')[1].split('\n')[0] != undefined) {      //2 params - no terminating
                let t = parseInt( chunk.split(' ')[1].split('\n')[0])
                stop = setTimeout((t) => {
                    console.log(`server shutdown in ${t} msec`); 
                    server.close(() => {console.log('shutdown')}        // keeps old connections
                )}, t, t)
            } else if (stop != null && chunk.split(' ')[1].split('\n')[0] != undefined) {  // 2 params - on terminating
                clearTimeout(stop);
                let t = parseInt( chunk.split(' ')[1].split('\n')[0])
                stop = setTimeout((t) => {
                    console.log(`server new shutdown in ${t} msec`) 
                    server.close(() => {console.log('shutdown')}        // keeps old connections
                )}, t, t)
            }           

        } else if(chunk.split('\r\n')[0] == 'sd') {
            clearTimeout(stop);
            console.log('shutdown terminated')
            stop = null;

        } else if (chunk.split(' ')[0] == 'sc') {
            if (commit == null && chunk.split(' ')[1].split('\n')[0] != undefined) {
                let t = parseInt( chunk.split(' ')[1].split('\n')[0])
                commit = setInterval(() => {db.emit('COMMIT')}, t)
                commit.unref()
            }  
        } else if (chunk.split('\r\n')[0] == 'sc') {
            if(commit != null) {
                clearInterval(commit)
                commit = null
            }

        } else if (chunk.split(' ')[0] == 'ss') {
            if (statistics_handle == null) {
                let t = parseInt( chunk.split(' ')[1].split('\n')[0])
                stat.begin = Date(Date.now()).toString()
                
                statistics_handle = setTimeout(() => {stat.commits = db.commits; stat.end = Date(Date.now()).toString()}, t)
                statistics_handle.unref()
            }

        } else if (chunk.split('\r\n')[0] == 'ss') {
            if (statistics_handle != null) {
                clearTimeout(statistics_handle)
                stat.begin = stat.commits = stat.end = null
                statistics_handle = null
            }
        }
    }
})