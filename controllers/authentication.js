var passport = require('passport')
module.exports = function (app) {


    require('../models/authentication')(app, passport)

    app
        .post('/ad/login', passport.authenticate('admin-local-login', {
            successRedirect: '/ad/dashboard',
            failureRedirect: '/ad/login',
            failureFlash: true
        }))
        .post('/signup', passport.authenticate('signup', {
            successRedirect: '/ad/dashboard',
            failureRedirect: '/signup',
            failureFlash: true
        }))
        .get('/logout', function (req, res) {
            req.logout();
            res.redirect('/ad/login');
        })
}