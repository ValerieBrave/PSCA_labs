var http = require('http')
var fs = require('fs')

let bound = 'lerchik-lerchik-lerchik'
let options = {
    host: 'localhost',
    path: '/files',
    port: 4000,
    method: 'POST',
    headers: {'content-type':'multipart/form-data; boundary='+bound}
}

let body = `--${bound}\r\n`
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.txt"\r\n'
    body += 'Content-Type:text/plain\r\n\r\n'
    body += fs.readFileSync('D:\\PSCA\\Lab9\\MyFile.txt')
    body += `\r\n--${bound}--\r\n`

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    let data =''
    res.on('data', (chunk) => {data += chunk})
    res.on('end', () => {console.log('body: '+data)})
})
req.end(body)