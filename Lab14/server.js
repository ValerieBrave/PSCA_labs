const http = require('http')
const mssql = require('mssql')

const get_handler = require('./get_handlers')
const post_handler = require('./post_handlers')
const put_handler = require('./put_handlers')
const delete_handler = require('./delete_handlers')

let request_handler = (req, res, pool) => {
    if(req.method == 'GET') get_handler(req, res, pool)
    else if(req.method == 'POST') {
        let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              post_handler(req, res, JSON.parse(body), pool);
          });
    }
    else if(req.method == 'PUT') {
        let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              put_handler(req, res, JSON.parse(body), pool);
          });
    }
    else if(req.method == 'DELETE') delete_handler(req, res, pool)
}

let config = {user: 'svv', password:'svv', server: 'localhost', database:'node14lab',
                pool: {max: 10, min: 0, softIdleTimeoutMillis: 5000, idleTimeoutMillis: 10000}};

let server = http.createServer();
server.listen(3000);
server.on('request', (req, res) => {
    const pool = new mssql.ConnectionPool(config, err => {
        if (err) {
            console.log('Database connection failed: ', err.code);
        }
        else {
            console.log('Database connection success');
            request_handler(req, res, pool);
        }
    });
})