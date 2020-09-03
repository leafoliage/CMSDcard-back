const express = require('express')
const PostModel = require('../model/post')
const UserModel = require('../model/user')
const authenticateToken = require('./auth')
const api = express()

api.get('/post/:id', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.findById(req.params.id)
        if (!data) res.sendStatus(404)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.get('/post/select/hot', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.find().sort({ likeNum: -1 }).limit(10)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.get('/post/select/new', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.find().sort({ postTime: -1 }).limit(10)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.put('/post/search', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.find({$or:[{ content: { $regex: req.body.regex, $options: 'i' } },{ title: { $regex: req.body.regex, $options: 'i' } }]}).sort({ postTime: -1 })
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.post('/post', authenticateToken, async (req, res) => {
    try {
        if (!req.body.title || !req.body.content || !req.body.content.replace(/\s/g, '').length) {
            return res.status(400).send('Title and content should not be empty')
        }

        const user = await UserModel.findById(req.currUser.userId)

        let post = {
            authorId: req.currUser.userId,
            authorName: user.name,
            title: req.body.title,
            content: req.body.content,
            postTime: new Date(),
            likeIds: req.body.likeIds
        }

        const data = await PostModel.create(post)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.put('/post/:id', async (req, res) => {
    try {
        const data = await PostModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.put('/post/like/:postId', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.findByIdAndUpdate(req.params.postId, { $addToSet: { likeIds: req.currUser.userId } })
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.delete('/post/:id', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.findByIdAndDelete(req.params.id)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = api