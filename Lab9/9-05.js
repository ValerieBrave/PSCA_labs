var http = require('http')
let parseString = require('xml2js').parseString
let xmlbuilder = require('xmlbuilder')

let options = {
    host: 'localhost',
    path: '/xml',
    port: 3000,
    method: 'POST',
    headers: {'content-type':'application/xml', 'accept':'application/xml'}
}

let xml = xmlbuilder.create('request').att('id', '23')
            xml.ele('x').att('value', '2')
            xml.ele('x').att('value', '6')
            xml.ele('x').att('value', '4')
            xml.ele('m').att('value', 'a')
            xml.ele('m').att('value', 'm')

const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    let data =''
    res.on('data', (chunk) => {data += chunk})
    res.on('end', () => {console.log('body: '+data)})
})
req.end(xml.toString({pretty: true}))