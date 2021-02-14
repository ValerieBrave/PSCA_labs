const Sequelize = require('sequelize')
var http = require('http')


global.sequelize = new Sequelize('node18lab', 'svv', 'svv', 
{host:'localhost', dialect:'mssql', pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }})
  const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('./orm').ORM(sequelize)
  const get_handler = require('./handlers/get')
  const post_handler = require('./handlers/post')
  const put_handler = require('./handlers/put')
  const delete_handler = require('./handlers/delete')


let request_handler = (req, res) => {
  if(req.method == 'GET') {
    get_handler(req, res)
  } else if (req.method == 'POST') {
    let body = '';
    req.on('data', chunk => {body += chunk.toString()})
    req.on('end', () => {post_handler(req, res, JSON.parse(body))})
  } else if (req.method == 'PUT') {
    let body = '';
    req.on('data', chunk => {body += chunk.toString()})
    req.on('end', () => {put_handler(req, res, JSON.parse(body))})
  } else if (req.method == 'DELETE') {
    delete_handler(req, res)
  }
}

let server = http.createServer();
server.listen(3000, async () => {
  sequelize.authenticate()
  .then(()=>{console.log('connection success')})
  .then(() => {
    return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITED})
    .then(t => {
      sequelize.query('update AUDITORIUM set AUDITORIUM_CAPACITY = AUDITORIUM_CAPACITY +1', {transaction:t},
      {type: sequelize.QueryTypes.UPDATE} )
      .then((result)=>{
        console.log('before rollback')
        setTimeout(()=>{t.rollback(); console.log('rollback')}, 10000)
      })
    })
  })
  .catch(err => {console.log(err)})
});
server.on('request', (req, res) => { request_handler(req, res)})
