var fs = require('fs')
var webSock = require('ws')

const wsserver = new webSock.Server({port: 4000, host: 'localhost', path: '/download'})

wsserver.on('connection', (ws) => {
    const duplex = webSock.createWebSocketStream(ws, {encoding:'utf-8'})
    let rfile = fs.createReadStream('./download/MyFile.txt')
    rfile.pipe(duplex)
});