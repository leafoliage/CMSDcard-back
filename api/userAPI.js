const express = require('express')
const { SHA256 } = require('crypto-js')
const UserModel = require('../model/user')
const api = express()

api.get('/user/:id', async (req, res) => {
    return await UserModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/user', async (req, res) => {
    const user = new UserModel(req.body)

    if (user.password) {
        user.password = SHA256(user.password)
    }

    return await user.save()
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/user/:id', async (req, res) => {
    if (req.body.password) {
        req.body.password = SHA256(req.body.password)
    }

    return await UserModel.findByIdAndUpdate(req.params.id, req.body)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.delete('/user/:id', async (req, res) => {
    return await UserModel.findByIdAndDelete(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

module.exports = api
