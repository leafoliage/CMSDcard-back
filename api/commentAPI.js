const express = require('express')
const CommentModel = require('../model/comment')
const UserModel = require('../model/user')
const authenticateToken = require('./auth')
const api = express()

api.get('/comment/single/:id', async (req, res) => {
    try {
        const data = await CommentModel.findById(req.params.id)
        if (!data) res.sendStatus(404)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.get('/comment/post/:postId', authenticateToken, async (req, res) => {
    try {
        const data = await CommentModel.find({ targetPost: req.params.postId })
        if (!data) res.sendStatus(404)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.post('/comment/:postId', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.currUser.userId)

        if (!req.body.content || !req.body.content.replace(/\s/g, '').length) {
            return res.status(400).send('Comment should not be empty')
        }

        let comment = {
            authorId: req.currUser.userId,
            authorName: user.name,
            targetPost: req.params.postId,
            content: req.body.content,
            postTime: new Date()
        }

        const data = await CommentModel.create(comment)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.put('/comment/:id', async (req, res) => {
    try {
        const data = await CommentModel.findByIdAndUpdate(req.params.id, req.body)
        if (!data) res.sendStatus(404)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.delete('/comment/:id', authenticateToken, async (req, res) => {
    try {
        const data = await CommentModel.findByIdAndUpdate(req.params.id, {
            authorName: "",
            content: `! 留言已遭刪除 !
            此留言違反社群守則：
            「禁止不雅、侮辱、歧視及攻擊詞語」`,
            deleted: true
        })

        if (!data) res.sendStatus(404)
        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = api