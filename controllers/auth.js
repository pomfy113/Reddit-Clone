var User = require('../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

module.exports = function(app) {

// SIGN UP POST
    app.get('/sign-up', function(req, res, next) {
      // Create User and JWT
      res.render('sign-up', {})
    });

    app.post('/sign-up', function(req, res, next) {
      // Create User and JWT
      var user = new User(req.body);
      console.log(user);

      user.save(function (err) {
        if (err) { return res.status(400).send({ err: err }) }

        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      })

    });
    app.get('/logout', function(req, res, next) {
      res.clearCookie('nToken');

      res.redirect('/');
    });


    // LOGIN FORM
    app.get('/login', function(req, res, next) {
      res.render('login');
    });

    // Actual log-in

    // LOGIN
    app.post('/login', function(req, res, next) {
      User.findOne({ email: req.body.email }, "+password", function (err, user) {
        if (!user) { return res.status(401).send({ message: 'Wrong email or password' }) };
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ message: 'Wrong email or password' });
          }

          var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

          res.redirect('/');
        });
      })
    });

}
