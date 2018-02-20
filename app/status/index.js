'use strict';

var express = require('express');
var controller = require('./status.controller');
var passport = require('passport');

var router = express.Router();

router.put('/',  passport.authenticate('jwt', { session: false }), controller.update);

module.exports = router;