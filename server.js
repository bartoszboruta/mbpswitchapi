'use strict';

var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var morgan = require('morgan');

require('dotenv').config();
require('./config/db');
require('./config/passport')(passport);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));

require('./routes')(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

exports = module.exports = app;