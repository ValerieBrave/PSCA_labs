const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('./users.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: 'lab22_session_secret'}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(new LocalStrategy((username, password, done) => {
    for (let user of users) {
        if (username === user.username && password === user.password)
            return done(null, user);
    }
    return done(null, false, {message: 'Wrong login or password'})
}))

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
app.post( '/login', passport. authenticate('local', { successRedirect: '/resource', failureRedirect: '/login' }))
app.get('/resource', (req, res, next) => {
    if (req.user) next()
    else res.redirect('/login')
    }, (req, res) => {
    res.send(`Resource`)
})
app.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('login')
})
app.listen(3000, () => console.log("Server is running on 3000"))