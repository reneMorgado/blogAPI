const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const reportRoute = require('./routes/report')
const apiURI = require('./routes/home')
const userRoute = require('./routes/users')

const connectDB = require('./database')

const app = express();

app.set('port', process.env.PORT || '8000');

//Middlewares
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/static', express.static(__dirname + '/public'));

//Routes
app.use('/api', apiURI);
app.use('/report', reportRoute)
app.use('/user', userRoute)


app.get('/', (req, res) => {
    res.send({
        "Your-location": "Rene's API",
        "True-website": "renemorgado.github.io"
    })
})

try {
    app.listen(app.get('port'), () => {
        console.log('App running on port ' + app.get('port'))
    })
    connectDB()
} catch (error) {
    console.log(error)
}