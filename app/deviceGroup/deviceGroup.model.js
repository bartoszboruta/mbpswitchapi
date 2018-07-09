'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DeviceGroupSchema = new Schema({
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  name: String,
  color: String,
})

DeviceGroupSchema.pre('save', function(next) {
  var now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

module.exports = mongoose.model('DeviceGroup', DeviceGroupSchema)
