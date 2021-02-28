const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars').create({extname:'.hbs'})

const Sequelize = require('sequelize')
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
}
global.sequelize = new Sequelize('execution_control', 'svv', 'svv', {host:'localhost', dialect:'mssql'})
//const {Job_status, Team, Employee, Job} = require('./models/orm').ORM()



const app = express()
app.engine('.hbs', hbs.engine)
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())  //почему без этого тело PUT пустое, а POST нормально?

const homeRouter = require('./routes/home_routes')()
const jobsRouter = require('./routes/jobs_router')()
const employeesRouter = require('./routes/employees_router')()
const statusesRouter = require('./routes/statuses_router')()
const teamsRouter = require('./routes/teams_routes')()



app.use('/home', homeRouter)
app.use('/job', jobsRouter)
app.use('/employee', employeesRouter)
app.use('/status', statusesRouter)
app.use('/team', teamsRouter)
app.use(( req, res, next) => {res.status(404).send('Not found')})

app.listen(3000, async () => {
    console.log('server running at http://localhost:3000')
    sequelize.authenticate()
    .then(()=>{console.log('connection success')
    })
})



