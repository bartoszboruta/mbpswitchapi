'use strict';

var express = require('express');
var controller = require('./user.controller');
var passport = require('passport');

var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.show);
router.delete('/', passport.authenticate('jwt', { session: false }), controller.destroy);
router.put('/',  passport.authenticate('jwt', { session: false }), controller.update);
router.post('/', controller.create);

module.exports = router;