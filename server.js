var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
// Middleware
// // Body Parser, method override
app.use(bodyParser.urlencoded({ extended: true }));
// // Express - public
app.use(express.static('public'));
// // Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// // mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');

// Controller
// // Posts
require('./controllers/posts.js')(app);
// Model

app.get('/', function(req, res){
    res.render('home', {})
})

app.get('/posts/new', function(req, res){
    res.render('posts-new', {})
})

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
