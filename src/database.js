const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://reneMorgado:140727@blogrene.tybur.mongodb.net/blogRene?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Db is connected to', db.connection.host))
    .catch(err => console.error(err))