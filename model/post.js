const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    authorName: { type: String },
    title: { type: String },
    content: { type: String },
    postTime: { type: Date },
    likeIds: { type: [ObjectId] },
    isDeleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('Post', PostSchema)