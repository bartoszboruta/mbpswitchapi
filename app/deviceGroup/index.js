'use strict';

var express = require('express');
var controller = require('./deviceGroup.controller');
var passport = require('passport');

var router = express.Router();

router.get('/',  passport.authenticate('jwt', { session: false }), controller.index);
router.post('/',  passport.authenticate('jwt', { session: false }), controller.create);

module.exports = router;