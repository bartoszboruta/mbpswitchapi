'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    createdAt: Date,
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    user.createdAt = new Date();
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (error, salt) {
            if (error) {
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if (error) {
                    return next(error);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);