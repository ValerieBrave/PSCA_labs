var fs = require('fs')
var webSock = require('ws')

const wclient = new webSock('ws://localhost:4000/download')

wclient.on('open', () => {
    const duplex = webSock.createWebSocketStream(wclient, {encoding:'utf-8'})
    let wfile = fs.createWriteStream('./MyFile_downloaded.txt')
    duplex.pipe(wfile)
})