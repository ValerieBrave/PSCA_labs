const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})


for (i = 1; i< 5; i++) {
    setTimeout(()=>{client.publish('channel-lerchik', `hello from lerchik `)}, i*1000)
}
client.quit();
