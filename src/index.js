const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const apiURI = require('./routes/home')
const app = express();

app.set('port', process.env.PORT || '8000');
app.use('/static', express.static(__dirname + '/public'));
require('./database');
app.use('/api', apiURI);
app.get('/', (req, res) => {
    res.send({
        "Your-location": "Rene's API",
        "True-website": "webURL",
        "Please": "Visit me ;)"
    })
})
try {
    app.listen(app.get('port'), () => {
        console.log('Server running on port: ' + app.get('port'));
    })
} catch (error) {
    console.log(error)
}