require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

const app = express();

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

// // Authorization
let checkAuth = (req, res, next) => {
  // If there's a cookie, they should be logged in
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    // Success! Decode the token, then put that payload into req.user
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next()
}
// // Run checkAuth
app.use(checkAuth)

// Model
const Post = require('./models/post');
const User = require('./models/user');

// Main page
app.get('/', (req, res) => {
    let currentUser = req.user;
    // Returns ALL the posts
    Post.find()
    .then( (posts) => {
        res.render('posts-index', { posts, currentUser });
    }).catch((err) => {
        res.send(err.message)
    })
})

// Controller
// // Posts
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(3000, function () {
  console.log('App listening on port 3000')
})

module.exports = app
