const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:4000')

let a=0, b=0, c=0
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = null;
    while((chunk = process.stdin.read()) != null) {
        
        if (chunk.split('\r')[0] == 'A') {
            ws.notify('A', {mes: `notification A: ${++a}`})
            console.log('notification A sent')
        } 
        else if (chunk.split('\r')[0] == 'B') {
            ws.notify('B', {mes: `notification A: ${++b}`})
            console.log('notification B sent')
        }
        else if (chunk.split('\r')[0] == 'C') {
            ws.notify('C', {mes: `notification C: ${++c}`})
            console.log('notification C sent')
        }
    }
})