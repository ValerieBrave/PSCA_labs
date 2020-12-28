const http = require('http')
const get_handler = require('./handlers/get_handler');
const post_handler = require('./handlers/post_handler');
const put_handler = require('./handlers/put_handler');
const delete_handler = require('./handlers/delete_handler');
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://svv_mongo:svv_mongo@lab15cluster.oi75x.mongodb.net/BSTU?retryWrites=true&w=majority'

let request_handler = (req, res) => {
    if(req.method == 'GET') get_handler(req, res, db)
    else if(req.method == 'POST') {
        let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              post_handler(req, res, JSON.parse(body), db);
          });
    }
    else if(req.method == 'PUT') {
        let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              put_handler(req, res, JSON.parse(body), db);
          });
    }
    else if(req.method == 'DELETE') delete_handler(req, res, db)
}

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})
let db;

const server = http.createServer();
server.listen(3000);
server.on('request', (req, res) => {
    client.connect(err => {
        if(err) console.log(err)
        else {
            console.log('MongoDB: connect successful');
            db = client.db('BSTU');
            request_handler(req, res);
        }
    })
})