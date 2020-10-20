var http = require('http');

var fs   = require('fs');

http.createServer(
    function(request, response) {
        if (request.url == '/fetch') {
            let html = fs.readFileSync('./fetch.html');
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.end(html);
        }
        else response.end('bad url(((');
    }
).listen(5000);