const express = require('express')
const PostModel = require('../model/post')
const UserModel = require('../model/user')
const authenticateToken = require('./auth')
const api = express()

api.get('/post/:id', authenticateToken, async (req, res) => {
    return await PostModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/post/select/hot', authenticateToken, async (req, res) => {
    return await PostModel.find().sort({ likeNum: -1 }).limit(5)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/post/select/new', authenticateToken, async (req, res) => {
    return await PostModel.find().sort({ postTime: -1 }).limit(10)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/post', authenticateToken, async (req, res) => {
    const user = await UserModel.findById(req.currUser.userId)
        .catch(err => { res.status(500).send(err) })

    let post = {
        authorId: req.currUser.userId,
        authorName: user.name,
        title: req.body.title,
        content: req.body.content,
        postTime: new Date(),
        likeIds: req.body.likeIds
    }

    return await PostModel.create(post)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/post/:id', async (req, res) => {
    return await PostModel.findByIdAndUpdate(req.params.id, req.body)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/post/like/:postId', authenticateToken, async (req, res) => {
    return await PostModel.findByIdAndUpdate(req.params.postId, { $addToSet: { likeIds: req.currUser.userId }, $inc: { likeNum: 1 } })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.delete('/post/:id', async (req, res) => {
    return await PostModel.findByIdAndDelete(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

module.exports = api