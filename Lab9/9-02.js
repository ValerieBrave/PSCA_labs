var http = require('http')
let query = require('querystring')

let parms = query.stringify({x:3, y:5})
let path = `/parameter?${parms}`

let options = {
    host: 'localhost',
    path: path,
    port: 3000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    console.log("response status message: ", res.statusMessage)
    let data =''
    res.on('data', (chunk) => {data += chunk.toString('utf-8')})
    res.on('end', () => {console.log('body: '+data)})
})
req.end()