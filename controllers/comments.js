var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {
    // Create comment on the thread
    app.post('/posts/:postId/comments', function (req, res) {

        // If not logged in, do this
        if (req.user == null) {
            res.redirect('/login/error');
            return
        }

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
    })


    app.get('/comments/:commentid/new', function(req,res){
        Comment.findById(req.params.commentid).then((comment)=>{
            res.render('comment-new', {comment});

        })
    })

    // Comments for comments!
    app.post('/comments/:commentid', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        var comment = new Comment(req.body);
        console.log(req.body)
        // SAVE INSTANCE OF POST MODEL TO DB

        Comment.findById(req.params.commentid).then((origcomment)=>{
            // findById resolved
            console.log(origcomment)
            origcomment.comments.unshift(comment)
            return origcomment.save()
        }).then((origcomment) => {
            // post.save resolved
            return comment.save()
        }).then((origcomment) => {
            // comment.save resolved
            res.redirect('/')
        }).catch((err)=>{
            console.log(err.message, "Could not save comment!")
            res.redirect('/')
        })
    })


}
