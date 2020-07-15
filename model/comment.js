const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
    author: { type: ObjectId, required: true },
    targetPost: { type: ObjectId, required: true },
    content: { type: String, required: true },
    postTime: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Comment', CommentSchema)