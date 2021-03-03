const mongoose = require('mongoose')

const mongo = 'mongodb+srv://userMERN:12345@blogrene.tybur.mongodb.net/eshop-database?retryWrites=true&w=majority'

const connectDB = async() => {
    try {
        await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            socketTimeoutMS: 0,
        })
        console.log('Connected to db')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB