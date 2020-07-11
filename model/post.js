const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    id: { type: ObjectId },
    author: { type: ObjectId },
    title: { type: String },
    content: { type: String },
    likeId: { type: [ObjectId] },
    dislikeId: { type: [ObjectId] },
    comment: { type: [Object] }
})

module.exports = mongoose.model('Post', PostSchema)