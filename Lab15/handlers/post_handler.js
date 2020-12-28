const url = require('url')

module.exports = (req, res, data, db) => {
    if(url.parse(req.url).pathname == '/api/faculty') {
        db.collection('faculty').insertOne({
            faculty: data.faculty,
            faculty_name: data.faculty_name},
            (err, result) => {
            if (err) {
                console.log(err)
                res.writeHead(500, err.message)
            } else {
                res.writeHead(200, {'Content-Type': 'application/json;'});
                res.end(JSON.stringify(result.ops[0]));
            }})
    } else if(url.parse(req.url).pathname == '/api/pulpit') {
        db.collection('pulpit').insertOne({
            pulpit: data.pulpit,
            pulpit_name: data.pulpit_name,
            faculty: data.faculty }, 
        (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead(500, err.message)
            } else {
                res.writeHead(200, {'Content-Type': 'application/json;'});
                res.end(JSON.stringify(result.ops[0]));
            }})
    }
}