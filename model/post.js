const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')

const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    authorName: { type: String },
    title: { type: String },
    content: { type: String },
    postTime: { type: Date },
    likeIds: { type: [ObjectId] },
    isDeleted: { type: Boolean, default: false },
    violationCode: { type: Number, default: 0 }
})

/**
 * Violation Code (isDeleted):
 *  0: ok
 *  1: 禁止不雅、侮辱、歧視及攻擊詞語
 *  2: 涉及毀謗他人之名譽
 *  3: 不得指名或透漏任何學生的身份
 *  4: 嚴禁張貼不正當的外部連結
 */

PostSchema.plugin(pagination)

module.exports = mongoose.model('Post', PostSchema)