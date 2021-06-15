const {ServerDH,ClientDH} = require('./DH_module');
const fs=require('fs');

const app = require('express')();
const bodyParser = require("body-parser");
const cipherFile = require('./file_module').cipherFile;

var serverDH;
var serverSecret;

app.use(bodyParser.urlencoded({ extended: false }));

//сервер сообщает общие числа p g
app.get('/',(req,res,next)=>
{
	serverDH = new ServerDH(1024,3);
	res.writeHead(200,{'Content-Type': 'application/json'});
	res.end(JSON.stringify(serverDH.getContext()));
});

app.post('/setKey',(req,res,next)=>
{
	let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
	const clientContext=JSON.parse(body);
	if(clientContext.key_hex!=undefined)
	{
		serverSecret=serverDH.getSecret(clientContext);	//
		console.log('serverSecret:',serverSecret);
		res.writeHead(200,{'Content-Type': 'text/plain'});
		var key=new Buffer(32);
		serverSecret.copy(key,0,0,32);

		const rs = fs.createReadStream('./files/in.txt');
		const ws = fs.createWriteStream('./files/ch.txt');
		cipherFile(rs,ws,key);
		res.end('Success');
	}
	else
	{
		res.statusCode=409;
		res.end('Failure');
	}
	});
});


app.get('/resource',(req,res,next)=>
{
	if(serverSecret!=undefined)
	{
		res.statusCode=200;
		let rs2=fs.createReadStream('./files/ch.txt');
		rs2.pipe(res);
		rs2.on('close',()=> {console.log(rs2.bytesRead); res.end();});
	}
	else
	{
		res.statusCode=409;
		res.end('Send request for /setKey');
	}
});
var server=app.listen(3000,()=>{console.log('Server is listening: 3000');});