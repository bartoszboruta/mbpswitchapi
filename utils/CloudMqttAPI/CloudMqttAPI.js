'use strict'

var rp = require('request-promise')

module.exports = class CloudMqttAPI {
  constructor() {
    this.username = process.env.CLOUD_MQTT_USERNAME
    this.password = process.env.CLOUD_MQTT_PASSWORD
    this.url = process.env.CLOUD_MQTT_URL
  }

  createUser(device, callback) {
    if (!device || !device.serial || !device.password) {
      return callback(false)
    }

    var options = {
      method: 'POST',
      url: this.url + '/user',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      auth: {
        username: this.username,
        password: this.password,
      },
      form: {
        username: device.serial,
        password: device.password,
      },
    }

    rp(options)
      .then(
        function() {
          return this.createTopic(device)
        }.bind(this),
      )
      .then(function() {
        return callback(true)
      })
      .catch(function() {
        return callback(false)
      })
  }

  deleteUser(device, callback) {
    if (!device || !device.serial) {
      return callback(false)
    }

    var options = {
      method: 'DELETE',
      url: this.url + '/user/' + device.serial,
      auth: {
        username: this.username,
        password: this.password,
      },
    }

    rp(options)
      .then(function() {
        return callback(true)
      })
      .catch(function() {
        return callback(false)
      })
  }

  createTopic(device, callback) {
    if (!device || !device.serial) {
      return callback(false)
    }

    var options = {
      method: 'POST',
      url: this.url + '/acl',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      auth: {
        username: this.username,
        password: this.password,
      },
      form: {
        username: device.serial,
        pattern: device.serial + '_tt',
        type: 'topic',
        read: true,
        write: true,
      },
    }

    return rp(options)
  }
}
