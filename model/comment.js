const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
    author: { type: ObjectId },
    targetPost: { type: ObjectId },
    content: { type: String }
});

module.exports = mongoose.model('Comment', CommentSchema);