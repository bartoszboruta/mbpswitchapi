'use strict';

var express = require('express');
var controller = require('./data.controller');
var passport = require('passport');

var router = express.Router();

// router.post('/',  passport.authenticate('jwt', { session: false }), controller.create);
// router.post('/',  passport.authenticate('jwt', { session: false }), controller.show);

module.exports = router;