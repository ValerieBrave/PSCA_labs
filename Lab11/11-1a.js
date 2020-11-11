var fs = require('fs')
var webSock = require('ws')

const wclient = new webSock('ws://localhost:4000/upload')

wclient.on('open', () => {
    const duplex = webSock.createWebSocketStream(wclient, {encoding:'utf-8'})
    let rfile = fs.createReadStream('./MyFile.txt')
    rfile.pipe(duplex)
})