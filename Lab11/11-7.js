const { concat } = require('async')

const rpcWSS = require('rpc-websockets').Server
let server = new rpcWSS({port:4000, host:'localhost'})

server.register('A', p => {console.log(`${p.mes}`)})
server.register('B', p => {console.log(`${p.mes}`)})
server.register('C', p => {console.log(`${p.mes}`)})