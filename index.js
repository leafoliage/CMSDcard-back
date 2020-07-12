const express = require('express')
const mongoose = require('mongoose')
const userAPI = require('./api/userAPI')
const app = express()
require('dotenv').config()

app.use(express.json())

const url = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@firstmongo-3qdnz.mongodb.net/${process.env.db_name}CMSDcard?retryWrites=true&w=majority`

mongoose.connect(url)

app.use(userAPI)

app.listen(6001, () => {console.log('server listening on 6001')})