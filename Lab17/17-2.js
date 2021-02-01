const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})


let start = new Date().getTime();
for(let n = 1; n<=10000; n++) client.set(n, 'set' + n);
let end = new Date().getTime();
console.log(`Execution time of 10000 set: ${end-start}ms`);

start = new Date().getTime();
for(let n = 1; n<=10000; n++) client.get(n);
end = new Date().getTime();
console.log(`Execution time of 10000 get: ${end-start}ms`);

start = new Date().getTime();
for(let n = 1; n<=10000; n++) client.del(n);
end = new Date().getTime();
console.log(`Execution time of 10000 del: ${end-start}ms`);

client.quit();