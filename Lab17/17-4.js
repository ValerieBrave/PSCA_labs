const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})


let start = new Date().getTime()
for(let n = 1; n<=10000; n++) client.hset(n, n, JSON.stringify({id: n, val: `value ${n}`}))
let end = new Date().getTime()
console.log(`Execution time of 10000 hset: ${end-start}ms`)

start = new Date().getTime()
for(let n = 1; n<=10000; n++) client.hget(n, n)
end = new Date().getTime()
console.log(`Execution time of 10000 hget: ${end-start}ms`)

client.quit();