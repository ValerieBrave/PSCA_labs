const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})

client.set('i', 0)

let start = new Date().getTime()
for(let n = 1; n<=10000; n++) client.incr('i')
let end = new Date().getTime()
console.log(`Execution time of 10000 incr: ${end-start}ms`)

start = new Date().getTime()
for(let n = 1; n<=10000; n++) client.decr('i')
end = new Date().getTime()
console.log(`Execution time of 10000 decr: ${end-start}ms`)

client.quit()