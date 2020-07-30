const express = require('express')
const crypto = require('crypto')
const UserModel = require('../model/user')
const api = express()

api.get('/user/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
        .catch(err => { res.status(500).send(err) })

    if (!user) {
        res.status(404).send('User not found')
    }

    return res.send(user)
})

api.post('/user', async (req, res) => {
    const salt = crypto.randomBytes(16).toString('base64')
    const password = crypto.createHash('sha256').update(req.body.password + salt).digest('base64')

    let user = {
        name: req.body.name,
        email: req.body.email,
        password,
        salt
    }

    return await UserModel.create(user)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/user/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        res.status(404).send('User not found')
    }

    if (req.body.password) {
        req.body.password = crypto.createHash('sha256').update(req.body.password + user.salt).digest('base64')
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
