var http = require('http')

let options = {
    host: 'localhost',
    path: '/connection',
    port: 3000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    console.log("response status message: ", res.statusMessage)
    console.log("server port: ", res.socket.remotePort)
    console.log("server IP: ", res.socket.remoteAddress)

    let data =''
    res.on('data', (chunk) => {data += chunk.toString('utf-8')})
    res.on('end', () => {console.log('body: '+data)})
})
req.end()