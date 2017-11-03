var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {
      // CREATE
      app.post('/posts/:postId/comments', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        var comment = new Comment(req.body);
        console.log("Creating:", comment)
        // SAVE INSTANCE OF POST MODEL TO DB

        Post.findById(req.params.postId).then((post)=>{
            comment.save().then((comment) => {
                post.comments.unshift(comment)
                post.save()
                console.log("\n\nPost:", post)
            })
        }).then(()=>{
            console.log("Success!")
            res.redirect('/posts/' + req.params.postId)
        }).catch((err)=>{
            console.log(err.message, "Could not save comment!")
            res.redirect('/posts/' + req.params.postId)

        })

        //
        // comment.save().then((post) => {
        //     res.redirect('/posts/' + req.params.postId);
        // }).catch((err) => {
        //     console.log(err.message, "Could not save comment!")
        //     res.redirect('/posts/' + req.params.postId)
        //        })


    })

}
