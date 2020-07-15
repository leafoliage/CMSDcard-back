const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    author: { type: ObjectId, required: true },
    title: { type: String },
    content: { type: String },
    postTime: { type: Date, default: new Date() },
    likeIds: { type: [ObjectId] },
})

module.exports = mongoose.model('Post', PostSchema)