const express = require('express')
const PostModel = require('../model/post')
const api = express()

api.get('/post/:id', async (req, res) => {
    return await PostModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/post', async (req, res) => {
    const post = new PostModel(req.body)

    return await post.save()
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/post/:id', async (req, res) => {
    return await PostModel.findByIdAndUpdate(req.params.id, req.body)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.put('/post/like/:postId', async (req, res) => {
    return await PostModel.findByIdAndUpdate(req.params.postId, { $push: { likeIds: req.body.userId } })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.delete('/post/:id', async (req, res) => {
    return await PostModel.findByIdAndDelete(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

module.exports = api