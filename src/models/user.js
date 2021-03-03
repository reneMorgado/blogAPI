const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hashPass: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('UserSchema', userSchema, 'UserSchema')