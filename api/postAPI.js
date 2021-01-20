const express = require('express')
const PostModel = require('../model/post')
const UserModel = require('../model/user')
const authenticateToken = require('./auth')
const api = express()

api.get('/post/:id', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.findById(req.params.id)
        if (!data) return res.sendStatus(404)

        const likeNum = data.likeIds.length
        const hasLiked = data.likeIds.includes(req.currUser.userId)

        const returnData = {
            _id: data._id,
            authorName: data.authorName,
            title: data.isDeleted ? null : data.title,
            content: data.isDeleted ? null : data.content,
            postTime: data.postTime,
            likeNum,
            hasLiked,
            isDeleted: data.isDeleted,
            violationCode: data.violationCode
        }

        return res.status(200).send(returnData)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.get('/post/select/hot', async (req, res) => {
    try {
        const timeLimit = 604800000
        const data = await PostModel.find({ postTime: { $gte: new Date(new Date() - timeLimit) }, isDeleted: false })

        let returnData = []

        data.forEach(article => {
            returnData.push({
                _id: article._id,
                authorName: article.authorName,
                title: article.title,
                content: article.content,
                postTime: article.postTime,
                likeNum: article.likeIds.length,
                isDeleted: article.isDeleted
            })
        })

        returnData = returnData
            .sort((former, latter) => {
                if (former.likeNum < latter.likeNum) return 1
                else if (former.likeNum > latter.likeNum) return -1
                else return 0
            })
            .slice(0, 3)

        return res.status(200).send(returnData)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.get('/post/select/new', async (req, res) => {
    try {
        const data = await PostModel.find().sort({ postTime: -1 }).limit(10)

        let returnData = []
        data.forEach(article => {
            returnData.push({
                _id: article._id,
                authorName: article.authorName,
                title: article.title,
                content: article.content,
                postTime: article.postTime,
                isDeleted: article.isDeleted
            })
        })

        return res.status(200).send(returnData)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.put('/post/search', authenticateToken, async (req, res) => {
    try {
        if (!req.body.regex || !req.body.regex.replace(/\s/g, '').length) {
            return res.status(400).send('Should not search empty')
        }

        const searchQuery = { 
            $or: [
                { content: { $regex: req.body.regex, $options: 'i' } }, 
                { title: { $regex: req.body.regex, $options: 'i' } }
            ] 
        }
        const options = {
            page: req.body.page || 1,
            limit: 10,
            sort: { postTime: -1 }
        }

        const data = await PostModel.paginate(searchQuery, options)
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
        const data = await PostModel.findById(req.params.postId)
        if (data.isDeleted) return res.sendStatus(200)

        if (!data.likeIds.includes(req.currUser.userId)) {
            await PostModel.findByIdAndUpdate(req.params.postId, { $addToSet: { likeIds: req.currUser.userId } })
        } else {
            await PostModel.findByIdAndUpdate(req.params.postId, { $pull: { likeIds: req.currUser.userId } })
        }

        const returnData = await PostModel.findById(req.params.postId)

        return res.status(200).send(returnData)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

api.delete('/post/:id', authenticateToken, async (req, res) => {
    try {
        const data = await PostModel.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        })

        return res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = api