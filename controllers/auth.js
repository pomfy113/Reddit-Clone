const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// For testing

module.exports = (app) => {
    // Sign up page
    app.get('/sign-up', (req, res) => {
        // Render the sign-up page, else error
        res.render('sign-up', {})
    })

    // Post for the sign-up
    app.post('/sign-up', (req, res) => {
        // Create User
        let user = new User(req.body);
        // For debugging
        console.log("Username:", user, "\n\n");
        console.log("Body:", req.body)

        // Saving user and jwt token
        user.save(() => {
            // Else, use jwt to make token and save to cookie, then redirect
            // NOTE: dotenv required
            let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        }).catch((err) => {
            res.send(err.message)
        })

    });

    // Logout; clears cookies
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });

    // Login; render the login page
    app.get('/login', (req, res) => {
        res.render('login');
    });

    // LOGIN
    app.post('/login', (req, res) => {
        // Find a user that matches username
        User.findOne({ username: req.body.username }, "+password")
        .then((user) => {
            // If a user does not exist, return error
            if(!user){
                return res.status(401).send({ message: 'Wrong email or password' });
            }
            // Compares password
            user.comparePassword(req.body.password, (err, isMatch) => {
                // If password does not match, return error
                if(!isMatch){
                    return res.status(401).send({ message: 'Wrong email or password' });
                }
                // If it matches, make a cookie
                let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                res.redirect('/');
            })
        }).catch((err) => {
            res.send(err.message)
        })
    });

}
