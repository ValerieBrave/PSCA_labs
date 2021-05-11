const express = require('express')
const bodyParser = require("body-parser")
const jsonRouter = require('express-json-rpc-router')
const { validator_1, validator_2 } = require('./validators')
const { controller } = require('./controller')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const checks = {
    sum: (params, _, raw) => validator_1(params, _, raw),
    mul: (params, _, raw) => validator_1(params, _, raw),
    div: (params, _, raw) => validator_2(params, _, raw),
    proc: (params, _, raw) => validator_2(params, _, raw)
}

app.use(jsonRouter({
    methods: controller,
    beforeMethods: checks,
    onError(err) { console.log(err) }
}))


app.listen(3000, () => console.log(`server runs on http://localhost:3000`))