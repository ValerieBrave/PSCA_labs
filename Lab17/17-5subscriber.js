const redis = require('redis')

const client = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
                                    {password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})

client.on('subscribe', (channel, count) => {console.log('on subscribe: ', 'channel = ', channel, 'count = ', count)})

client.on('message', (channel, message) => {console.log('on message: ', 'channel = ', channel, 'message = ', message)})

client.subscribe('channel-lerchik')

setTimeout(()=>{
    client.unsubscribe()
    client.quit()
}, 60000)