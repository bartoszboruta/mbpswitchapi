'use strict';

var User = require('./user.model');

/*
* Creates new user
* return
* */
exports.create = function (req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (user) {
            return res.status(401).send('Email address is already taken.');
        }
        if (err) {
            return res.status(500).send('There was a problem adding the information to the database.');
        }

        User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            },
            function (err, user) {
                if (err) {
                    return res.status(500).send('There was a problem adding the information to the database.');
                }
                res.status(200).send(user);
            });
    });
};

/*
* Gets single users data information
* return
* */
exports.show = function (req, res) {
    User.findById(req.user.id, function (err, user) {
        if (err) {
            return res.status(500).send('There was a problem finding the user.');
        }
        if (!user) {
            return res.status(404).send('No user found.');
        }
        res.status(200).send(user);
    });
};

/*
* Delete user
* return
* */
exports.destroy = function (req, res) {
    User.findByIdAndRemove(req.user.id, function (err, user) {
        if (err) {
            return res.status(500).send('There was a problem deleting the user.');
        }
        res.status(200).send('User '+ user.name +' was deleted.');
    });
};

/*
* Edit user
* return
* */
exports.update = function (req, res) {
    User.findByIdAndUpdate(req.user.id, req.body, {new: true}, function (err, user) {
        if (err) {
            return res.status(500).send('There was a problem updating the user.');
        }
        res.status(200).send(user);
    });
};