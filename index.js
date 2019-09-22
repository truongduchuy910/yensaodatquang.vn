const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
// var flash = require('connect-flash');
// var session = require('express-session');
const bodyParser = require('body-parser')
const app = express();

var flash = require('connect-flash');
var session = require('express-session');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(flash());
app.set('view engine', 'ejs')
// app.use(session({ secret: 'xxxxxxxxxxxxx' }));
// app.use(flash());
require('./database/config')()
require('./controllers/authentication')(app)
require('./controllers/client')(app)
require('./controllers/public')(app)
require('./controllers/database')(app)
app.get('*', function (req, res) {
  res.render('public/pages/404')
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
