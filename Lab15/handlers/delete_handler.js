const url = require('url')

module.exports = (req, res,  db) => {
    if(url.parse(req.url).pathname.includes('/api/faculty')) {
        db.collection('faculty').deleteMany(
            { faculty: url.parse(req.url).pathname.split('/')[3] },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, err.message)
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json;'});
                    res.end(JSON.stringify(result));
                }
            })
    } else if(url.parse(req.url).pathname.includes('/api/pulpit')) {
        db.collection('pulpit').deleteMany(
            { pulpit: url.parse(req.url).pathname.split('/')[3] },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, err.message)
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json;'});
                    res.end(JSON.stringify(result));
                }
            })
    }
}