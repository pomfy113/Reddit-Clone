var chai = require('chai')
var chaiHttp = require('chai-http');
var should = chai.should();
var Post = require('../models/post');
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');

chai.use(chaiHttp);


// describe('Site', function() {
//     it('should have a live home page', function (done) {
//         chai.request('localhost:3000')
//         .get('/')
//         .end(function (err, res){
//             res.status.should.be.equal(200);
//             done();
//         });
//     });
// });

// describe('Posts', function() {
//     it('should create a post with valid attributes at POST /posts', function (done) {
//         // How many posts are there now?
//         Post.find(function(err, posts) {
//           var postCount = posts.length;
//
//           var post = { title: "post title", url: "https://www.google.com", summary: "post summary" }
//           chai.request('localhost:3000')
//             .post('/posts', post)
//             .end(function (err, res){
//                 console.log("This is the end!");
//               // Check that the database has one more post in it
//               Post.find(function(err, posts) {
//                   console.log(postCount, "amount of docs")
//                 postCount.should.be.equal(posts.length);
//                 });
//                 console.log(res)
//                 // Check that the response is a successful
//                 res.should.have.status(200);
//               done();
//           });
//         });
//     });
// });
