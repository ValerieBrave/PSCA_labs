const app = require('express')()
const passport = require('passport')
const DigestStrategy = require('passport-http').DigestStrategy
const {getCredential, varPassword} = require('./module')
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: '123'
  })

  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());


passport.use(new DigestStrategy({qop: 'auth'}, (user, done) => {
    let rc = null
    let cr = getCredential(user)
    if(!cr) rc = done(null, false)
    else rc = done(null, cr.username, cr.password)
    return rc
}, (params, done) => {
    console.log(`params = ${JSON.stringify(params)}`)
    done(null, true)
}))

passport.serializeUser((user, done)=>{
    console.log('SerializeUser')
    done(null, user);
  })
  passport.deserializeUser((user, done)=>{
    console.log('DeserializeUser')
    done(null, user);
  })

//middleware
app.get('/login', (req, res, next) => {
    if(req.session.logout && req.headers['authorization']) {
        req.session.logout = false
        delete req.headers['authorization']
    }
    next()
}, passport.authenticate('digest'), (req, res, next) => {
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