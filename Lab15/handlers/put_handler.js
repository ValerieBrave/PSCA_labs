const url = require('url')

module.exports = (req, res, data, db) => {
    if(url.parse(req.url).pathname == '/api/faculty') {
        db.collection('faculty').findOneAndUpdate(
            { faculty: data.faculty },
            { $set: {faculty_name: data.faculty_name}},
            (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead(500, err.message)
            } else {
                res.writeHead(200, {'Content-Type': 'application/json;'});
                res.end(JSON.stringify(data))
            }
        });
    } else if(url.parse(req.url).pathname == '/api/pulpit') {
        db.collection('pulpit').findOneAndUpdate(
            { pulpit: data.pulpit },
            { $set: {pulpit_name: data.pulpit_name, faculty: data.faculty}},
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500, err.message)
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json;'})
                    res.end(JSON.stringify(data))
                }
            })
    }
}