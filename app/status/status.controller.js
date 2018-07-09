'use strict'

var Data = require('../data/data.model')
var Device = require('../device/device.model')
var Status = require('../status/status.model')
var { Mqtt } = require('../../utils/Mqtt')
var mqtt = new Mqtt()

/*
* Sets new status in status schema and adds to data
* */
exports.update = (req, res) => {
  Device.findOne({ _id: req.body.deviceId, createdBy: req.user.id }, (err, device) => {
    if (!device) {
      return res.status(401).send('No device found.')
    }
    if (err) {
      return res.status(500).send('There was a problem adding the information to the database.')
    }

    const publishCallback = published => {
      if (!published) {
        return res.status(500).send('There was a problem with sending information to device.')
      }

      Status.findOneAndUpdate(
        { _id: device.status },
        {
          data: req.body.data,
        },
        { new: false },
        err => {
          if (err) {
            return res
              .status(500)
              .send('There was a problem adding the information to the database status.')
          }
          res.status(200).json(req.body.data)
        },
      )
    }
    mqtt.publish(device, req.body.data, publishCallback)
  })
}
