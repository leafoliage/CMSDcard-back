const express = require('express')
const bcrypt = require('bcrypt')
const api = express()
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')

api.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            res.status(404).send('User not found')
        }

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

api.post('/user/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        const data = await UserModel.create(user)
        res.status(201).send(data)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

api.post('/user/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).send('user not found')
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const data = { userId: user._id }
            const accessToken = jwt.sign(data, process.env.access_token_secret)
            res.json({ accessToken: accessToken })
        } else {
            res.status(401).send('Login Fail')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})

api.put('/user/:id', async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            res.status(404).send('User not found')
        }

        const data = await UserModel.findById(req.params.id)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// api.delete('/user/:id', async (req, res) => {
//     return await UserModel.findByIdAndDelete(req.params.id)
//         .then(data => { res.send(data) })
//         .catch(err => { res.status(500).send(err.message) })
// })

module.exports = api
