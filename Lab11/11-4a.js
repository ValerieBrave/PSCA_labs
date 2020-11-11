var webSock = require('ws')

const wclient = new webSock('ws://localhost:4000/json')
wclient.on('open', () => {
    wclient.on('message', (data) => {
        console.log('server message: ', JSON.parse(data));
    });

    setInterval(() => {
        wclient.send(JSON.stringify({ client: process.argv[2], timestamp: new Date().toISOString() }));
    }, 5000);
});