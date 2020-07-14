const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    posts: { type: [ObjectId] }
})

module.exports = mongoose.model('User', UserSchema)