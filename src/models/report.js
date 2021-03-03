const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    },
    operation: {
        type: String,
        enum: ['Egreso', 'Ingreso'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ReportSchema', ReportSchema, 'ReportSchema')