var http = require('http')
var url = require('url')
let fs = require('fs')
const rpcWSS = require('rpc-websockets').Server

let server = http.createServer((request, response) => {
    switch(request.method){
        case 'GET': get_handler(request, response); break;
        case 'POST': post_handler(request, response); break;
        case 'PUT': put_handler(request, response); break;
        case 'DELETE': delete_handler(request, response); break;
    }
}).listen(4000)

let rpc_server = new rpcWSS({port:4000, host:'localhost'})
rpc_server.event('file_change')
fs.watch('./StudentList.json', {encoding: 'buffer'}, (eventType, filename) => {
    if(eventType === 'change') {
        rpc_server.emit('file_change', {message: 'file StudentList.json changed'});
    }
});

get_handler = (req, res) => {
    if(url.parse(req.url).pathname == '/') {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(fs.readFileSync('./StudentList.json'))
    } else if(url.parse(req.url).pathname == '/backup') {
        
        fs.readdir('./backup', {withFileTypes: true}, (err, files) => {
            let arr = new Array
            files.forEach((e,i) => {
                arr[i] = e.name
            })
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(JSON.stringify(arr))
        })
    } else {        //n
        let id = parseInt(url.parse(req.url).pathname.split('/')[1])
        let found = false;
        let stud_file = require('./StudentList.json')
        stud_file.forEach((e, i) =>{
            if(e.id == id) {
                res.writeHead(200, {'Content-type': 'application/json'})
                res.end(JSON.stringify(e))
                found = true
            }
        })
        if(!found) {
            res.writeHead(404)
            res.end()
        } 
        //console.log(stud_file)
    }
}

post_handler = (req, res) => {
    if(url.parse(req.url).pathname == '/') {
        req.on('data', (data) => {
            let found = false;
            let obj = JSON.parse(data)
            let objs = JSON.parse(fs.readFileSync('./StudentList.json'))
            objs.forEach((e, i) =>{
                if(e.id == obj.id) {
                    res.end('id is already taken')
                    found = true
                }
            })
            if(!found) {
                objs.push(obj)
                fs.writeFile('./StudentList.json', JSON.stringify(objs), e => {if(e) console.log(e)})
                res.writeHead(200, {'Content-type': 'application/json'})
                res.end(JSON.stringify(obj))
            }
        })
    } else if(url.parse(req.url).pathname == '/backup') {
        setTimeout(()=>{
            let date = new Date()
            let pref = date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate().toString()+date.getSeconds().toString();
            console.log(pref)
            fs.open(`./backup/${pref}_StudentList.json`, 'w', (e, file) => {
                
                fs.appendFile(`./backup/${pref}_StudentList.json`, fs.readFileSync('./StudentList.json'), (e) => {
                    if(e) res.end('smth wrong!!')
                    else res.end('file created')
                })
            })
        }, 2000)
        
    }
}

put_handler = (req, res) => {
    if(url.parse(req.url).pathname == '/') {
        req.on('data', data => {
            let new_obj = JSON.parse(data)
            let objs = JSON.parse(fs.readFileSync('./StudentList.json'))
            let obj = objs.find((e, i, a) => {return e.id == new_obj.id})
            
            if(obj) {
                let ind = objs.findIndex((e, i, a) => {return e.id == obj.id})
                objs.splice(ind, 1, new_obj)
                fs.writeFile('./StudentList.json', JSON.stringify(objs), e => {if(e) console.log(e)})
                res.writeHead(200, {'Content-type': 'application/json'})
                res.end(JSON.stringify(new_obj))
            } else res.end('id not found')
            
        })
    }
}

delete_handler = (req, res) => {
    if(url.parse(req.url).pathname.includes('backup')) {
        let fullstring = url.parse(req.url).pathname.split('/')[2]
        let year = parseInt(fullstring.substr(0,4))
        let month = parseInt(fullstring.substr(4,2))
        let day = parseInt(fullstring.substr(6,2))
        fs.readdir('./backup', {withFileTypes: true}, (err, files) => {
            if(err) console.log(err); else
            {
                let arr = new Array
                files.forEach((e,i) => {
                    let fyear = parseInt(e.name.substr(0,4))
                    let fmonth = parseInt(e.name.substr(4,2))
                    let fday =  parseInt(e.name.substr(6,2))
                    console.log(fyear+' '+fmonth +' '+fday)
                    if(fyear > year) fs.unlink('./backup/'+e.name, (e) => {if(e) console.log(e)})
                    else if (fyear >= year && fmonth > month) fs.unlink('./backup/'+e.name, (e) => {if(e) console.log(e)})
                    else if (fyear >= year && fmonth >= month && fday > day) fs.unlink('./backup/'+e.name, (e) => {if(e) console.log(e)})
                })
            }
            
        })
        res.end()
    } else {        //n
        let id = parseInt(url.parse(req.url).pathname.split('/')[1])
        let objs = JSON.parse(fs.readFileSync('./StudentList.json'))
        let obj = objs.find((e, i, a) => {return e.id == id})
        let ind = objs.findIndex((e, i, a) => {return e.id == id})
        if(ind != -1) {
            objs.splice(ind, 1);
            fs.writeFile('./StudentList.json', JSON.stringify(objs), e => {if(e) console.log(e)})
            res.writeHead(200, {'Content-type': 'application/json'})
            res.end(JSON.stringify(obj))
        } else res.end('id not found')
    }
    
}