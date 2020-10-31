var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer((req, res) => {
    if(url.parse(req.url).pathname=='/parameter' && req.method == 'POST') {
        let xstr = url.parse(req.url, true).query['x']
        let ystr = url.parse(req.url, true).query['y']
        let mes = url.parse(req.url, true).query['s']
        let body = `x + y = ${parseInt(xstr)} + ${parseInt(ystr)} = ${parseInt(xstr) + parseInt(ystr)}`
        res.statusMessage = mes
        res.end(body)
    } else if(url.parse(req.url).pathname=='/files' && req.method == 'POST') {
        let body = ''
        req.on('data', data => {
            body += data
        })
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end(body)
        })
    } else if(url.parse(req.url).pathname=='/png' && req.method == 'POST') {
        let body = ''
        req.on('data', data => {
            body += data
        })
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(body, 'binary')
        })
    } else if(url.parse(req.url).pathname=='/download' && req.method == 'GET') {
        let bound = 'lerchik-lerchik-lerchik'
        let body = `--${bound}\r\n`
        body += 'Content-Disposition: form-data; name="file"; filename="MyFile.txt"\r\n'
        body += 'Content-Type:text/plain\r\n\r\n'
        body += fs.readFileSync('D:\\PSCA\\Lab9\\MyFile.txt')
        body += `\r\n--${bound}--\r\n`
        res.writeHead(200, {'content-type':'multipart/form-data; boundary='+bound})
        res.end(body)
    }
}).listen(4000)