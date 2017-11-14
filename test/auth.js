var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var User = require('../models/user');

describe('Testing User', function() {

    it('should not be able to login if they have not registered', function (done) {
   agent
     .post('/login', { email: "wrong@wrong.com", password: "nope" })
     .end(function (err, res){
       res.status.should.be.equal(401);
       done();
     });

 });

 beforeEach(() => {
     return User.findOneAndRemove({ username: "testone" })
 })
 // signup
it('should be able to signup', (done) => {
    agent
      .post('/sign-up')
      .type('form') // Put this on github - issue
      .send({ username: "testone", password: "password" })
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200);
        res.should.have.cookie("nToken");
        done();
    });
})

    // login
it('should be able to logout', function (done) {
 agent
   .get('/logout')
   .end(function (err, res) {
     res.should.have.status(200);
     res.should.not.have.cookie("nToken");
     done();
   });
});
// login
it('should be able to login', function (done) {
 agent
   .post('/login')
   .send({ email: "username", password: "password" })
   .end(function (err, res) {
     res.should.have.status(200);
     res.should.have.cookie("nToken");
     done();
   });
});

});
