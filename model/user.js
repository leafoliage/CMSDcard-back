const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // posts: { type: [ObjectId] }
})

module.exports = mongoose.model('User', UserSchema)