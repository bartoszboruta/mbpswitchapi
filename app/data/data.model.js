'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
    createdAt: {
        type: Date
    },
    data: String,
    device: {
        type: Schema.ObjectId,
        ref: 'Device'
    }
});

DataSchema.pre('save', function(next) {
    this.createdAt = new Date();
    next();
});

module.exports = mongoose.model('Data', DataSchema);