var webSock = require('ws')

const wclient = new webSock('ws://localhost:4000/pingpong')
const duplex = webSock.createWebSocketStream(wclient, {encoding:'utf-8'})
duplex.pipe(process.stdout)

