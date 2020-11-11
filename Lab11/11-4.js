var webSock = require('ws')

const wsserver = new webSock.Server({port: 4000, host: 'localhost', path: '/json'})
let n = 0

wsserver.on('connection', (ws) => {
    ws.on('message', data => {
        let obj = JSON.parse(data)
        console.log(obj)
        ws.send(JSON.stringify({server: ++n, client: obj.client, timestamp: obj.timestamp}))
    })
})