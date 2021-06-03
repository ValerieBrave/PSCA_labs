const app = require('express')()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { redisClient } = require('./db')
const Users = require('./model')

const accessKey = 'accsessTokenSecret'
const refreshKey = 'refreshTokenSecret'
var oldRefreshKeyCount = 0

app.use(cookieParser('lab22'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, user) => {
            if (err) next()
            else if(user) {
                console.log(user)
                req.user = user
                next()
            }
        })
    }
    else next()
})

app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'))

app.post('/login', async (req, res) => {
    const candidate = await Users.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    if (candidate) {
        const accessToken = jwt.sign({id: candidate.id, username: candidate.username}, accessKey, {expiresIn: 10 * 60})
        const refreshToken = jwt.sign({id: candidate.id, username: candidate.username}, refreshKey, {expiresIn: 24 * 60 * 60})
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict'
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            //path: '/login'
        });
        res.redirect('/resource')
    } else {
        res.redirect('/login')
    }
 })

 app.post('/register', async (req, res) => {
    await global.sequelize.query(`insert into users(id, username, password) values (${Date.now()/1000},'${req.body.username}', '${req.body.password}')`)
    res.redirect('/login');
 })

 app.get('/refresh-token', (req, res) => {
    if (req.cookies.refreshToken) {
        jwt.verify(req.cookies.refreshToken, refreshKey,async (err, user) => {
            if (err) console.log(err.message);
            else if(user) {
                redisClient.set(oldRefreshKeyCount, req.cookies.refreshToken, () => console.log('set old refresh token'));
                redisClient.get(oldRefreshKeyCount, (err, result) => console.log('added old refresh token:', result));
                oldRefreshKeyCount++;
                
                const candidate = await Users.findOne({
                    where: {
                        id: user.id
                    }
                });
                const newAccessToken = jwt.sign({id: candidate.id, username: candidate.username}, accessKey, {expiresIn: 10 * 60});
                const newRefreshToken = jwt.sign({id: candidate.id, username: candidate.username}, refreshKey, {expiresIn: 24 * 60 * 60});
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    sameSite: 'strict'
                });
                res.cookie('refreshToken', newRefreshToken, {
                    path: '/refresh-token'
                });
                res.redirect('/resource');
            }
        });
    }
    else res.status(401).send('Please, authorize');
});

app.get('/resource', (req, res) => {
    if (req.user) res.status(200).send(`Resource ${req.user.id}-${req.user.username}`);
    else res.status(401).send('Non authorized');
});

app.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

sequelize.sync().then( () => {
    app.listen(3000, () => {
        redisClient.on('error', (err) => {console.log('error ' + err)})
        redisClient.on('connect', () => {console.log('redis connect success')})
        sequelize.authenticate().then(() => console.log('connect to MSSQL - connection success'))
        console.log('Server is running on 3000')
    })
})


