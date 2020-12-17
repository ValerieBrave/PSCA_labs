const net = require('net')

let HOST = '0.0.0.0'
let PORT = 4000

let sum = 0
let timer = null
net.createServer((sock) => {
    sock.on('data', data => {
        console.log('server data: ', data, ' sum: ', sum, 'data = ', data.readInt32LE() )
        sum += data.readInt32LE()
    })
    let buf = new Buffer.alloc(4);
    timer = setInterval(() => {buf.writeInt32LE(sum, 0); sock.write(buf)}, 5000)

    sock.on('close', ()=>{clearInterval(timer); console.log('client closed '+ sock.remoteAddress)})
}).listen(PORT, HOST)