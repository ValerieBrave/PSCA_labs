const net = require('net')

let HOST = '127.0.0.1'
let PORT = 4000

let client = new net.Socket();

client.connect(PORT, HOST, ()=> {
    console.log(`client connected  ${client.remoteAddress}:${client.remotePort}`)
    client.write('Hello!\n')
})
client.on('data', data => {
    console.log(`server answer: ${data.toString()}`);
    client.destroy();
})
client.on('close', () => {console.log('client closed')})