var http = require('http')
var fs = require('fs')

let bound = 'lerchik-lerchik-lerchik'
let body = `--${bound}\r\n`
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.png"\r\n'
    body += 'Content-Type:application/octet-stream\r\n\r\n'
    body += fs.readFileSync('D:\\PSCA\\Lab9\\MyFile.png')
    body += `\r\n--${bound}--\r\n`
let options = {
    host: 'localhost',
    path: '/png',
    port: 4000,
    method: 'POST',
    headers: {'content-type':'multipart/form-data; boundary='+bound}
}

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    let data =''
    res.on('data', (chunk) => {data += chunk})
    res.on('end', () => {console.log('body: '+data)})
})

req.write(body)
let stream = new fs.ReadStream('D:\\PSCA\\Lab9\\MyFile.png')
stream.on('data', (chunk) => { req.write(chunk)})
stream.on('end', () =>{req.end(`\r\n--${bound}--\r\n`)})
