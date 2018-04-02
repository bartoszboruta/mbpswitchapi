'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Status = require('../status/status.model');

var DeviceSchema = new Schema({
    createdAt: {
        type: Date
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    group: {
        type: Schema.ObjectId,
        ref: 'DeviceGroup'
    },
    name: String,
    password: {
        type: String
    },
    serial: {
        type: String
    },
    status: {
        type: Schema.ObjectId,
        ref: 'Status'
    },
    type: {
        default: 1,
        type: Number
    },
    updatedAt: {
        type: Date
    }
});

DeviceSchema.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    var status = new Status({
        createdBy: this._id,
        data: '0'
    });

    status.save(function (err, status) {
        if (err) {
            return handleError(err);
        }
    });

    this.status = status._id;
    next();
});

module.exports = mongoose.model('Device', DeviceSchema);