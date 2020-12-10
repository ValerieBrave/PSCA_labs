const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:4000')

ws.on('open', () => {
    ws.subscribe('file_change')
    ws.on('file_change', p => {console.log('server event: ', p.message)})
})