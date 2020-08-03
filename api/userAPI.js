const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('../model/user')
const api = express()

api.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            res.status(404).send('User not found')
        }

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

api.post('/user', async (req, res) => {
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
        res.status(500).send(err)
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
        res.status(500).send(err)
    }
})

// api.delete('/user/:id', async (req, res) => {
//     return await UserModel.findByIdAndDelete(req.params.id)
//         .then(data => { res.send(data) })
//         .catch(err => { res.status(500).send(err) })
// })

module.exports = api
