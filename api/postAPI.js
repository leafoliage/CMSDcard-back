const express = require('express')
const PostModel = require('../model/post')
const UserModel = require('../model/user')
const api = express()

api.get('/post/:id', async (req, res) => {
    return await PostModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/post/select/hot', async (req, res) => {
    return await PostModel.find().sort({ likeNum: -1 }).limit(5)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/post/select/new', async (req, res) => {
    return await PostModel.find().sort({ postTime: -1 }).limit(10)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/post', async (req, res) => {
    const user = await UserModel.findById(req.body.authorId)
        .catch(err => { res.status(500).send(err) })

    let post = {
        authorId: req.body.authorId,
        authorName: user.name,
        title: req.body.title,
        content: req.body.content,
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

api.put('/post/like/:postId', async (req, res) => {

    return await PostModel.findByIdAndUpdate(req.params.postId, { $push: { likeIds: req.body.userId }, $inc: { likeNum: 1 } })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.delete('/post/:id', async (req, res) => {
    return await PostModel.findByIdAndDelete(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

module.exports = api