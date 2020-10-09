const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://reneMorgado:140727@blogrene.tybur.mongodb.net/blogRene?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err) {
        console.log(err);
    }
    console.log('Connected database')
});