var jwt = require('jsonwebtoken')

exports.signToken = user =>
  jwt.sign(user.toJSON(), process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  })
