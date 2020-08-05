const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    authorName: { type: String },
    targetPost: { type: ObjectId, required: true },
    content: { type: String, required: true },
    postTime: { type: Date }
})

module.exports = mongoose.model('Comment', CommentSchema)