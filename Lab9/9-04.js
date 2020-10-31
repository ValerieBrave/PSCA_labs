var http = require('http')

let jsonm = JSON.stringify(
    {
        __comment: "hello lab 9",
        x: 10,
        y:4,
        m: ['b', 's', 't', 'u'],
        o: {'name': 'Lerchik', 'pogonyalo': 'perchik'}
    }
    )
let options = {
    host: 'localhost',
    path: '/json',
    port: 3000,
    method: 'POST',
    headers: {'content-type':'application/json', 'accept':'application/json'}
}

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    let data =''
    res.on('data', (chunk) => {data += chunk.toString('utf-8')})
    res.on('end', () => {console.log('body: '+data)})
})
req.end(jsonm)