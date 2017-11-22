const Post = require('../models/post');
const User = require('../models/user');


module.exports = function(app) {
    // Create new post
    app.post('/posts', function (req, res) {
        // If not logged in, do this
        if (req.user == null) {
            console.log("ERROR: Not logged in!")
            res.redirect(401, '/login');
            return
        }
        // New post!
        let post = new Post(req.body);
        // Find the logged in user; need this to post
        User.findById(req.user._id).then((user) => {
            post.author = user
            return post.save()
        }).then(() => {
            // After finishing, redirect
            res.redirect('/posts/'+ post._id)
        }).catch((err) => {
            console.log(err.message, "Could not save post!")
            res.send(err.message)
        })
    })

    // New post
    app.get('/posts/new', (req, res) => {
        let currentUser = req.user;
        res.render('posts-new', { currentUser })
    })
    
    // Getting individual posts
    app.get('/posts/:id', function (req, res) {
        // Look up post, then render; if it doesn't work, error msg
        let currentUser = req.user;
        // Grab specific Post using url
        Post.findById(req.params.id)
        .then((post) => {
            res.render('post-show', { post, currentUser })
        }).catch((err) => {
            res.send(err.message)
        })
    })

    // Grab all posts in the same subreddit
    app.get('/n/:subreddit', function(req, res) {
        // Look up post with matching subreddit parameter
        Post.find({subreddit: req.params.subreddit }).then((post) => {
            res.render('subreddit', { post })
        }).catch((err) => {
            res.send(err.message)
        })
    });

    // Grab posts by user
    app.get('/users/:username', function(req, res){
        // Find user by ID, then return all posts by that author
        User.findOne({username: req.params.username}).then((username) => {
            return Post.find({ author: username._id })
        }).then((post) => {
            return res.render('user-posts', {post})
        }).catch((err) => {
            res.send(err.message)
        })

    })

    // Voting up; uses AJAX/jquery to get here
    app.put('/posts/:id/vote-up', (req, res) => {
        // Find post
        Post.findById(req.params.id)
        .then((post) => {
            // Must be logged in to alter
            if(req.user === null){
                console.log("You must be logged in!")
            }
            // If user is inside list of people who already voted, deny
            else if(post.upVotes.includes(req.user._id)){
                console.log(post.upVotes)
                console.log("You already voted on this post")
                console.log(req.user._id)
                res.status(200);
            }
            // Otherwise, change score
            else{
                post.upVotes.push(req.user._id)
                post.voteScore = post.voteScore + 1
                post.save();
                res.status(200);
            }
        })
    })

    // Voting up; uses AJAX/jquery to get here
    app.put('/posts/:id/vote-down', (req, res) => {
        // find post
        Post.findById(req.params.id)
        .then((post) => {
            if(req.user === null){
                console.log("You must be logged in!")
            }
            else if(post.downVotes.includes(req.user._id)){
                console.log(post.downVotes)
                console.log(req.user._id)
                console.log("You already voted on this post")
            }
            else{
                post.downVotes.push(req.user._id)
                post.voteScore = post.voteScore - 1
                post.save();
                console.log(post, req.user)
                res.status(200);
            }
        })
    })
}
