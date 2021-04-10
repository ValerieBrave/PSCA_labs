const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const {getCredential, verifyPassword} = require('./module')
const session = require('express-session')(
    {
        resave: false,
        saveUninitialized: false,
        secret: '987654321'
    }
)

const app = express();

//app settings
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

//auth settings
passport.use(new BasicStrategy( (user, password, done) => {
    let rc = null
    let cr = getCredential(user)
    if(!cr) rc = done(null, false, {message:'incorrect username'})
    else if(!verifyPassword(cr.password, password)) rc = done(null, false, {message:'incorrect password'})
    else rc = done(null, user, {message: 'All ok'})
    return rc
}))
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

//middleware
app.get('/login', (req, res, next) => {
    if(req.session.logout && req.headers['authorization']) {
        req.session.logout = false
        delete req.headers['authorization']
    }
    next()
}, passport.authenticate('basic'), (req, res, next) => {
    if(req.session.logout == undefined)
    req.session.logout = false
    next()
})
.get('/login', (req, res, next)=>{
    console.log('authenticated')
    res.end('authenticated')
})
app.get('/logout', (req, res)=>{
    console.log('Logout')
    req.session.logout = true
    delete req.headers['authorization']
    res.redirect('/login')
  })
  
app.get('/resource', (req, res)=>{
console.log('Resource')
if(req.session.logout == false && req.headers['authorization'])
    res.end('Resource')
else
    res.redirect('/login')
})
app.use(( req, res, next) => {res.status(404).send('Not found')})
//
app.listen(3000)