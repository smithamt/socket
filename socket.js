const express = require('express')
const setupSocketIO = require('./socket/io')
const { corsOptions } = require('./whitelist')

const PORT = 3003
const app = express()

const server = app.listen(PORT, () => console.log("running", PORT))
const { io } = setupSocketIO(server, corsOptions)

console.log('io')