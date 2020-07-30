const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const userAPI = require('./api/userAPI')
const postAPI = require('./api/postAPI')
const commentAPI = require('./api/commentAPI')

app.use(express.json())

const url = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@firstmongo-3qdnz.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(userAPI)
app.use(postAPI)
app.use(commentAPI)

app.listen(6001, () => {console.log('server listening on 6001')})