const express = require('express')
const CommentModel = require('../model/comment')
const UserModel = require('../model/user')
const authenticateToken = require('./auth')
const api = express()

api.get('/comment/single/:id', async (req, res) => {
    return await CommentModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/comment/post/:postId', authenticateToken, async (req, res) => {
    return await CommentModel.find({ targetPost: req.params.postId })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/comment/:postId', authenticateToken, async (req, res) => {
    const user = await UserModel.findById(req.currUser.userId)
        .catch(err => { res.status(500).send(err) })

    let comment = {
        authorId: req.currUser.userId,
        authorName: user.name,
        targetPost: req.params.postId,
        content: req.body.content,
    }

    return await CommentModel.create(comment)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/comment/:id', async (req, res) => {
    return await CommentModel.findByIdAndUpdate(req.params.id, req.body)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.delete('/comment/:id', async (req, res) => {
    return await CommentModel.findByIdAndDelete(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

module.exports = api