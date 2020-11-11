const rpcWSS = require('rpc-websockets').Server
let server = new rpcWSS({port:4000, host:'localhost'})

server.event('A')
server.event('B')
server.event('C')

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=> {
    
    let chunk = null;
    while((chunk = process.stdin.read()) != null) {
        
        if (chunk.split('\r')[0] == 'A') {
            server.emit('A', {message: 'event A'});
            console.log('event A emitted')
        } 
        else if (chunk.split('\r')[0] == 'B') {
            server.emit('B', {message: 'event B'});
            console.log('event B emitted')
        }
        else if (chunk.split('\r')[0] == 'C') {
            server.emit('C', {message: 'event C'});
            console.log('event C emitted')
        }
    }
});