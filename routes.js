'use strict';

module.exports = function(app) {
    app.use('/api/v1/user', require('./app/user'));
    app.use('/api/v1/device', require('./app/device'));
    app.use('/api/v1/device_group', require('./app/deviceGroup'));
    app.use('/api/v1/status', require('./app/status'));
    app.use('/auth', require('./app/auth'));
};