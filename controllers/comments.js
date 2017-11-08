var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {
      // CREATE
      app.post('/posts/:postId/comments', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        var comment = new Comment(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB

        Post.findById(req.params.postId).then((post)=>{
            // findById resolved
            post.comments.unshift(comment)
            return post.save()
        }).then((post) => {
            // post.save resolved
            return comment.save()
        }).then((comment) => {
            // comment.save resolved
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
