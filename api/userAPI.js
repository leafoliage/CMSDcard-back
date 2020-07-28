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
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: SHA256(req.body.password)
    }

    return await UserModel.create(user)
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
