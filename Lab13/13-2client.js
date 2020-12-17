const net = require('net')

let HOST = '127.0.0.1'
let PORT = 4000

let client = new net.Socket();
let buf = new Buffer.alloc(4)
let timer = null;
client.connect(PORT, HOST, ()=> {
    console.log(`client connected  ${client.remoteAddress}:${client.remotePort}`)
    let k = 0
    //buf.writeInt32LE(++k,0); client.write(buf)
    timer = setInterval(()=>{buf.writeInt32LE(++k,0); client.write(buf)}, 1000)
    setTimeout(()=>{clearInterval(timer);  client.destroy();}, 20000)
})
client.on('data', (data) => {console.log('sum = ', data.readInt32LE())})