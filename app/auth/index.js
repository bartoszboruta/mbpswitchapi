'use strict';

var express = require('express');
var router = express.Router();
var User = require('../user/user.model');
var auth = require('./auth-service');

router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            return res.status(500).send('There was a problem adding the information to the database.');
        }
        if (!user) {
            res.status(404).send('Authentication failed. User not found.');
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = auth.signToken(user);
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        expiresIn: (Math.floor(new Date().getTime() / 1000) + Number(process.env.TOKEN_EXPIRATION_TIME))
                    });
                } else {
                    res.status(404).send('Authentication failed. Passwords did not match.');
                }
            });
        }
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;