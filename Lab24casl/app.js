const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cookieParser('lab24'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


global.accessKey = 'accsessTokenSecret'
global.refreshKey = 'refreshTokenSecret'
global.oldRefreshKeyCount = 0


let authRouter = require('./routes/auth.route')
let apiRouter = require('./routes/api.route')

app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, user) => {
            if (err) next()
            else if(user) {
                req.user = user
                next()
            }
        })
    }
    else next()
})

app.use(express.static('static'))
app.use(authRouter)
app.use(apiRouter)
app.use((err, req, res, next) => {
    res.send(`${err}`)
})

app.listen(3000, () => {console.log('come and get me on 3000 port')})