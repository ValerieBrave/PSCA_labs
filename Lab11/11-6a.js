const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:4000')

ws.on('open', () => {
    ws.subscribe('A')
    ws.on('A', p => {console.log('server event: ', p.message)})
})