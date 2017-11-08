require('dotenv').config()
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

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
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}



app.use(checkAuth)



// Model
var Post = require('./models/post');
var User = require('./models/user');


app.get('/', function(req, res){
    var currentUser = req.user;
    // var username = User.findById(req.user._id).then((user) =>{
    //     newthing = user.username
    //     console.log(newthing)
    //     return(newthing)
    // })
        Post.find().populate('author').then((posts)=>{
        // Returns ALL the posts
        res.render('posts-index', { posts, currentUser });
        }).catch((err)=>{
            console.log(err.message, "Could not get index page!")
        })
        console.log(req.cookies);
    // else{
    //     console.log("User is logged in!")
    //     User.findById(req.user._id).then((user) =>{
    //         let username = user.username
    //         Post.find().then((posts)=>{
    //         // Returns ALL the posts
    //         res.render('posts-index', { posts, currentUser, username });
    //         }).catch((err)=>{
    //             console.log(err.message, "Could not get index page!")
    //         })
    //         console.log(req.cookies);
    //     })
    // }
})

// New post
app.get('/posts/new', function(req, res){
    var currentUser = req.user;
    res.render('posts-new', {currentUser})
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

module.exports = app
