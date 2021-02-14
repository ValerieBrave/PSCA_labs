const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})

client.on('ready', () => {console.log('ready')})
client.on('error', (err) => {console.log('error ' + err)})
client.on('connect', () => {console.log('connect')})
client.on('end', () => {console.log('end')})


//client.set('k1', 'v1x', (err, res) => {console.log('k1:', 'err = '+ err, 'result = '+res)})
//client.get('k1', (err, res) => {console.log('k1:', 'err = '+ err, 'result = '+res)})
//client.del('k1', (err, res) => {console.log('k1:', 'err = '+ err, 'result = '+res)})
//client.get('k1', (err, res) => {console.log('k1:', 'err = '+ err, 'result = '+res)})
client.quit()