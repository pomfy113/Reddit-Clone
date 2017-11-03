var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')

// Middleware
// // Body Parser, method override
app.use(bodyParser.urlencoded({ extended: true }));
// // Express - public
app.use(express.static('public'));
// // Cookie Parser
app.use(cookieParser());
// // Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// // mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');
// // authorization
var checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next()
}

app.use(checkAuth)



// Model
var Post = require('./models/post');


app.get('/', function(req, res){
    Post.find().then((posts)=>{
        // Returns ALL the posts
        res.render('posts-index', { posts })
    }).catch((err)=>{
        console.log(err.message, "Could not get index page!")
    })
    console.log(req.cookies);
})

// New post
app.get('/posts/new', function(req, res){
    res.render('posts-new', {})
})

// LOGOUT
app.get('/logout', function(req, res, next) {
  res.clearCookie('nToken');

  res.redirect('/');
});


// Controller
// // Posts
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);




app.listen(3000, function () {
  console.log('App listening on port 3000')
})
