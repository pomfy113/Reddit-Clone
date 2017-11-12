var Post = require('../models/post');
var User = require('../models/user');


module.exports = function(app) {

    // CREATE
    app.post('/posts', function (req, res) {

        // If not logged in, do this
        if (req.user == null) {
            res.redirect('/login/error');
            return
        }

        // INSTANTIATE INSTANCE OF POST MODEL
        var post = new Post(req.body);

        User.findById(req.user._id).then((user) => {
            post.author = user
            return post.save()
        }).then(() => {
            res.redirect('/posts/'+ post._id)
        }).catch((err) => {
            console.log(err.message, "Could not save post!")
            res.redirect('/posts/new')
        })

        // User.findById(req.user._id).exec(function (err, user) {
        //
        //   var post = new Post(req.body, user);
        //   console.log(post)
        //   post.save(function (err, post) {
        //     // REDIRECT TO THE NEW POST
        //     res.redirect('/posts/'+ post._id)
        //   });
        // });


    })
    // Getting individual posts
    app.get('/posts/:id', function (req, res) {
        // Look up post, then render; if it doesn't work, error msg
        var currentUser = req.user;

        Post.findById(req.params.id)
        // .populate({
        //     path: 'comments',
        //     populate: { path: 'comments'}
        // })
        // .populate('author')
        .then((post) => {
            res.render('post-show', { post, currentUser })
        }).catch((err) => {
            console.log(err.message, "Could not find post!")
        })
    })

    app.get('/n/:subreddit', function(req, res) {
        Post.find({subreddit: req.params.subreddit }).then((post) => {
            res.render('subreddit', { post })
        }).catch((err) => {
            console.log(err.message, "Could not find subreddit!")
        })
    });

    app.get('/users/:username', function(req, res){
        User.findOne({username: req.params.username}).then((username) =>{
            console.log(username)
            return Post.find({ author: username._id })
        }).then((post) => {
            console.log(post)
            return res.render('user-posts', {post})
        }).catch((err) => {
            console.log(err.message, "Error with getting username junk")
        })

    })
}
