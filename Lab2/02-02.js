var http = require('http');
var fs   = require('fs');

http.createServer(
    function(request, response) {
        if (request.url == '/png') {
            let png = fs.readFileSync('./beach.png');
            response.writeHead(200, {'Content-Type':'image/png; charset=utf-8'});
            response.end(png, 'binary');
        }
        else response.end('bad url(((');
    }
).listen(5000);