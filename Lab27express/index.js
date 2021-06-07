const app = require('express')()
const { createClient } = require('webdav')
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const router = require('./router')

global.client = createClient("https://webdav.yandex.ru",
{
    username: "valeria.smelova0",
    password: ""
})

    
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())
app.use(router)
app.use('**', (req, res) => {res.status(404).send('try another url pls')})

app.listen(3000, () => console.log("Starting listen port 3000"));