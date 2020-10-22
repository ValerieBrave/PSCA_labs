let qs  = require('querystring')
var http = require('http')
var url = require('url')
let fs = require('fs')
let parseString = require('xml2js').parseString
let xmlbuilder = require('xmlbuilder')
let mp = require('multiparty')

var server = http.createServer();
var _socket;

http_handler =  (req, res) => {

    if(url.parse(req.url).pathname == '/' && req.method == 'GET') res.end('try another url!')

    if(url.parse(req.url).pathname == '/connection' && req.method == 'GET') {       //1
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(server.keepAliveTimeout.toString())
    } else if(url.parse(req.url).pathname.includes("/connection/set=")) {
        let set = url.parse(req.url).pathname.split('=')[1]
        let setint = parseInt(set)
        if(!isNaN(setint)) {
            server.keepAliveTimeout = setint
            res.end(`server.keepAliveTimeout = ${server.keepAliveTimeout.toString()}`)
        }
        else res.end('parm is Nan')
    }

    if(url.parse(req.url).pathname == '/headers' && req.method == 'GET') {          //2
        let rc = 'REQUEST <br/>';
        for(key in req.headers) rc +='<h4>'+key+' : '+ req.headers[key]+'</h4>'
        res.setHeader('X-Author','Valeria Smelova');
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Language', 'en');
        rc += 'RESPONCE <br/>';
        let names = res.getHeaderNames();
        names.forEach(el => {
            rc+='<h4>'+ `${el}  :`+res.getHeader(el)+'</h4>';
        });
        res.end(rc);
    }

    if(url.parse(req.url).pathname == '/parameter' && req.method == 'GET') {            //3
        if(url.parse(req.url, true).query['x'] != undefined && url.parse(req.url, true).query['y'] != undefined) {
            let x = parseInt(url.parse(req.url, true).query['x'])
            let y = parseInt(url.parse(req.url, true).query['y'])
            if(isNaN(x) || isNaN(y)) res.end('check your params you stupid')
            let rc = '';
            rc += 'x+y=' + `${x+y}` + '\n' +
                  'x-y=' + `${x-y}` + '\n' +
                  'x*y=' + `${x*y}` + '\n' +
                  'x/y=' + `${x/y}`
            res.end(rc)
        } else res.end('lack of params you stupid')
    }

    if(url.parse(req.url).pathname.includes('/parameter/') && req.method == 'GET') {        //4
        console.log()
        let parx = url.parse(req.url).pathname.split('/')[2]
        let pary = url.parse(req.url).pathname.split('/')[3]
        let x = parseInt(parx)
        let y = parseInt(pary)
        if(!isNaN(x) && !isNaN(y)) {
            let rc = '';
            rc += 'x+y=' + `${x+y}` + '\n' +
                  'x-y=' + `${x-y}` + '\n' +
                  'x*y=' + `${x*y}` + '\n' +
                  'x/y=' + `${x/y}`
            res.end(rc)
        } else res.end(req.url)
    }

    if(url.parse(req.url).pathname== '/close' && req.method == 'GET') {     //5
        stop = setTimeout(() => {
            console.log(`server shutdown in 10 msec`) 
            server.close(() => {console.log('shutdown')}        
        )}, 10)
        res.end()
    }

    if(url.parse(req.url).pathname== '/socket' && req.method == 'GET') {        //6
        rc =''
        rc+='client address: '+_socket.remoteAddress + '\n' +
            'client port: ' + _socket.remotePort + '\n' +
            'server address: ' + _socket.localAddress + '\n' +
            'server port: ' + _socket.localPort + '\n'
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(rc)
    }

    if(url.parse(req.url).pathname == '/req-data' && req.method == 'GET') {     //7
        let data = [];
        let pushes = 0
        req.on('data', chunk => {data.push(chunk); pushes++});
        req.on('end', () =>
        {
            console.log(`pushes = ${pushes}`);
            console.log(data);
            res.end();
        });
    }

    if(url.parse(req.url).pathname.includes('resp-status') && req.method == 'GET') {        //8
        if(url.parse(req.url, true).query['code'] != undefined) {
            let codestr = url.parse(req.url, true).query['code'].split('?')[0]
            let code = parseInt(codestr)
            let statstr = url.parse(req.url, true).query['code'].split('?')[1]
            let stat = statstr.split('=')[1]

            if(!isNaN(code)) res.statusCode = code
            res.statusMessage = stat
            res.end()
        } else res.end('check your params you stupid')  
    }

    if(url.parse(req.url).pathname == '/formparameter' && req.method == 'POST') {       //9
        let rc =''
        let o = ''
        req.on('data', data => {rc += data.toString()})
        req.on('end', () => {
            let o = qs.parse(rc)
            let result = ''
            for(let key in o) {
                result += `${key} = ${o[key]} </br>`
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            
            res.end(result)
        });
    }

    if(url.parse(req.url).pathname == '/json' && req.method == 'POST') {    //10
        let body = ''
        req.on('data', data => {body += data})
        req.on('end', () => {
            let obj = JSON.parse(body)
            let ret = {
                __comment: 'responce!!!',
                x_plus_y: obj.x + obj.y,
                concat: obj.o == undefined? null: (obj.o.name + ' ' + obj.o.pogonyalo),
                length_m: obj.m == undefined? null : obj.m.length
            }
            if(!isNaN(ret.x_plus_y) && ret.concat != null && ret.length_m != null) {
                let retstr = JSON.stringify(ret)
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(retstr)
            } else res.end('check your json you stupid')
        })
    }

    if(url.parse(req.url).pathname == '/xml' && req.method == 'POST') {     //11
        let body = ''
        let sum = 0
        let reqno = 0
        let conc = ''
        req.on('data', data => {body += data})
        req.on('end', () => {
            parseString(body, function(err, result) {
                reqno = result.request.$.id
                result.request.x.map((e, i) => {sum+=parseInt(e.$.value)})
                result.request.m.map((e, i) => {conc+=e.$.value})
            })
            console.log(reqno)
            console.log(sum)
            console.log(conc)
            let xml = xmlbuilder.create('response').att('request', reqno.toString())
            xml.ele('sum').att('element', 'x').att('result', sum.toString())
            xml.ele('concat').att('element', 'm').att('result', conc)
            res.end(xml.toString({pretty: true}))
        })
    }

    if(url.parse(req.url).pathname == '/files' && req.method == 'GET') {        //12
        fs.readdir( 'static', (error, files) => { 
            let totalFiles = files.length
            res.setHeader('X-static-files-count',totalFiles.toString());
            res.end()
         });
    }

    if(url.parse(req.url).pathname.includes('/files/') && req.method == 'GET') {
        let filename = url.parse(req.url).pathname.split('/')[2]
        try{
            let file = fs.readFileSync('static/'+filename);
            res.end(file)
        } catch (err){
            res.writeHead(404)
            res.end()
        }
    }

    if(url.parse(req.url).pathname == '/upload' && req.method == 'GET') {
        let html = fs.readFileSync('./upload.html');
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(html);
    } else if(url.parse(req.url).pathname == '/upload' && req.method == 'POST') {
        let form = new mp.Form({uploadDir: 'static'})
        form.on('file', (name, file) => {
            console.log(file)
        })
        form.parse(req)
        res.end()
    }
}

server.on('connection', (sock) => {_socket = sock})
server.on('request', http_handler)
server.listen(3000)