const express = require('express')
const CommentModel = require('../model/comment')
const api = express()

api.get('/comment/single/:id', async (req, res) => {
    return await CommentModel.findById(req.params.id)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.get('/comment/post/:postId', async (req, res) => {
    return await CommentModel.find({ targetPost: req.params.postId })
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err) })
})

api.post('/comment', async (req, res) => {
    const comment = new CommentModel(req.body)

    return await comment.save()
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