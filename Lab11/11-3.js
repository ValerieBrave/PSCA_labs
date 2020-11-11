var webSock = require('ws')

const wsserver = new webSock.Server({port: 4000, host: 'localhost', path: '/pingpong'})
let n = 0
let pings = 0

wsserver.on('connection', (ws) => {
    console.log(`${wsserver.clients.size} connected clients`);
    wsserver.clients.forEach((client) => {
        setInterval(() => {
            client.send(`11-03-server: ${++n}\n`);
        }, 15000)
        setInterval(() => {
            ws.ping(`server: ping ${++pings}`);
        }, 5000);
        ws.on('pong', (data) => {console.log('on pong '+data.toString())})
    })
})
