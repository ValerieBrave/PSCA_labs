const express = require('express')
const fs = require('fs')

const app = express()

let wasmCode = fs.readFileSync('a.out.wasm')

let wasmModule = new WebAssembly.Module(wasmCode)
let wasmInstance = new WebAssembly.Instance(wasmModule, {})

app.get('/', (req, res, next) => {
    res.type('html').send(
        `sum(10, 5) = ${wasmInstance.exports.sum(10,5)}<br>`+
        `sub(10, 5) = ${wasmInstance.exports.sub(10,5)}<br>`+
        `mul(10, 5) = ${wasmInstance.exports.mul(10,5)}`
    )
})

app.listen(3000)