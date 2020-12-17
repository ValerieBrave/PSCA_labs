const net = require('net')

let HOST = '0.0.0.0'
let PORT = 4000

net.createServer((sock) => {
    console.log('server connected: '+ sock.remoteAddress +': '+ sock.remotePort)
    sock.on('data', (data) => {
        console.log('server got data: '+ sock.remoteAddress+': '+data)
        sock.write('ECHO:'+data)
    })
    sock.on('close', ()=>{console.log('client closed '+ sock.remoteAddress)})
}).listen(PORT, HOST)

console.log(`TCP-server   ${HOST}:${PORT}`)