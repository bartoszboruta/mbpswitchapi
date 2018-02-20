'use strict';

var express = require('express');
var controller = require('./device.controller');
var passport = require('passport');

var router = express.Router();

router.get('/',  passport.authenticate('jwt', { session: false }), controller.index);
router.get('/:id',  passport.authenticate('jwt', { session: false }), controller.show);
router.delete('/:id',  passport.authenticate('jwt', { session: false }), controller.destroy);
router.put('/:id',  passport.authenticate('jwt', { session: false }), controller.update);
router.post('/',  passport.authenticate('jwt', { session: false }), controller.create);

module.exports = router;