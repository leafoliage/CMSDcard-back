const express = require('express')
const mongoose = require('mongoose')
const userAPI = require('./api/userAPI')
const app = express()

app.use(express.json())

// user=fire_tornado;pass=tornadoOnFire;db=firstMongo
mongoose.connect('mongodb+srv://fire_tornado:tornadoOnFire@firstmongo-3qdnz.mongodb.net/CMSDcard?retryWrites=true&w=majority')

app.use(userAPI)

app.listen(6001, () => {console.log('server listening on 6001')})