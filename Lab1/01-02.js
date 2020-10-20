var http = require('http'); // import http module
// createServer returns HTTP server object that listens to 3000 port and executes callback function
http.createServer( function(request, response) {    // function = request listener
    response.writeHead(200, {'Content-Type':'text/html'});  // set status code + object with response headers
    response.end('<h1 style="color: pink;"> Hello, World!</h1>'); // signals that all of the response headers and body have been sent + response.write
}).listen(3000);
console.log('Server is running at http://localhost:3000');