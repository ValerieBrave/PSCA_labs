var fs = require('fs')
var webSock = require('ws')

const wsserver = new webSock.Server({port: 4000, host: 'localhost', path: '/upload'})

wsserver.on('connection', (ws) => {
    const duplex = webSock.createWebSocketStream(ws, {encoding:'utf-8'})
    let wfile = fs.createWriteStream('./upload/MyFile_uploaded.txt')
    duplex.pipe(wfile)
});