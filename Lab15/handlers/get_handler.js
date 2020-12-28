const url = require('url')

module.exports = (req, res, db) => {
    if(url.parse(req.url).pathname == '/api/faculties') {
        db.collection('faculty').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.writeHead(500)
            } else {
                res.writeHead(200, {'Content-Type': 'application/json;'});
                res.end(JSON.stringify(docs));
            }
        })
    } else if(url.parse(req.url).pathname == '/api/pulpits') {
        db.collection('pulpit').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.writeHead(500)
            } else {
                res.writeHead(200, {'Content-Type': 'application/json;'});
                res.end(JSON.stringify(docs));
            }
        })
    }
}