const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var blogPost = new Schema({
    cat: {
        type: String,
        enum: ['Frontend', 'Backend', 'Released']
    },
    name: { type: String },
    description: { type: String },
    leng: { type: String },
    link: { type: String },
    gif: { type: String }
});

module.exports = mongoose.model('blogPost', blogPost)