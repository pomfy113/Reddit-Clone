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

// Model
var Post = require('./models/post');

// Controller
// // Posts
require('./controllers/posts.js')(app);

app.get('/', function(req, res){
    Post.find().then((posts)=>{
        // Returns ALL the posts
        res.render('posts-index', { posts })
    }).catch((err)=>{
        console.log(err.message, "Could not get index page!")
    })

})

app.get('/posts/new', function(req, res){
    res.render('posts-new', {})
})

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
