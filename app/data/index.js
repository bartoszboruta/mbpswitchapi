'use strict';

var express = require('express');
var controller = require('./data.controller');
var passport = require('passport');

var router = express.Router();

router.get('/',  passport.authenticate('jwt', { session: false }), controller.index);

module.exports = router;