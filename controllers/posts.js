var Post = require('../models/post');

module.exports = function(app) {

    // CREATE
    app.post('/posts', function (req, res) {
        // INSTANTIATE INSTANCE OF POST MODEL
        var post = new Post(req.body);
        console.log("Saving!")
        post.save().then((post) => {
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err.message, "Could not save post!")
        })

    })

    app.get('/posts/:id', function (req, res) {
        // Look up post, then render; if it doesn't work, error msg
        Post.findById(req.params.id).then((post) => {
            res.render('post-show', { post })
        }).catch((err) => {
            console.log(err.message, "Could not find post!")
        })
    })

}
