'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StatusSchema = new Schema({
  createdAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  data: String,
})

StatusSchema.pre('save', function(next) {
  this.createdAt = new Date()
  next()
})

module.exports = mongoose.model('Status', StatusSchema)
