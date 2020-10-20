var http = require('http');

http.createServer(
    function(request, response) {
        if (request.url == '/api/name') {
            response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost:5000'});
            //response.end('Valeria Smelova');
            response.write('Valeria Smelova');
            response.end();
        }
        else response.end('bad url(((');
    }
).listen(3000);