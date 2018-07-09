'use strict'

var rp = require('request-promise')

module.exports = class CloudMqttAPI {
  constructor() {
    this.apiUrl = process.env.CLOUD_API_URL
    this.apiKey = process.env.CLOUD_API_KEY
  }

  createUser(device, callback) {
    if (!device || !device.serial || !device.password) {
      return callback(false)
    }

    var options = {
      method: 'POST',
      url: this.apiUrl + '/user',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      auth: {
        user: '',
        pass: this.apiKey,
      },
      form: {
        username: device.serial,
        password: device.password,
      },
    }

    rp(options)
      .then(() => this.createTopic(device))
      .then(() => callback(true))
      .catch(() => callback(false))
  }

  deleteUser(device, callback) {
    if (!device || !device.serial) {
      return callback(false)
    }

    var options = {
      method: 'DELETE',
      url: this.apiUrl + '/user/' + device.serial,
      auth: {
        user: '',
        pass: this.apiKey,
      },
    }

    rp(options)
      .then(() => callback(true))
      .catch(() => callback(false))
  }

  createTopic(device, callback) {
    if (!device || !device.serial) {
      return callback(false)
    }

    var options = {
      method: 'POST',
      url: this.apiUrl + '/acl',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      auth: {
        user: '',
        pass: this.apiKey,
      },
      form: {
        username: device.serial,
        pattern: `${device.serial}_tt`,
        type: 'topic',
        read: true,
        write: true,
      },
    }

    return rp(options)
  }
}
