const Sequilize = require('sequelize')
const sequelize = new Sequilize('node14lab', 'svv', 'svv', 
{host:'localhost', dialect:'mssql', pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }})
  const {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium} = require('./orm').ORM(sequelize)

sequelize.authenticate().
then(()=>{
    console.log('success')
    sequelize.close()
}).
catch(err => {console.log(err)})

