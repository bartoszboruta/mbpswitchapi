'use strict'

var DeviceGroup = require('./deviceGroup.model')

/*
* Gets users deviceGroups data information
* return
* */
exports.index = (req, res) => {
  DeviceGroup.find(
    {
      createdBy: req.user.id,
    },
    (err, deviceGroup) => {
      if (err) {
        return res.status(500).send('There was a problem finding the device.')
      }
      if (!deviceGroup) {
        return res.status(404).send('No device found.')
      }
      res.status(200).send(deviceGroup)
    },
  )
}

/*
* Create deviceGroup
* return
* */
exports.create = (req, res) => {
  DeviceGroup.findOne(
    {
      name: req.body.name,
      createdBy: req.user.id,
    },
    (err, device) => {
      if (device) {
        return res.status(401).send('Name is already taken.')
      }
      if (err) {
        return res.status(500).send('There was a problem adding the information to the database.')
      }

      var newDeviceGroup = {
        color: req.body.color,
        name: req.body.name,
        createdBy: req.user.id,
      }

      DeviceGroup.create(newDeviceGroup, (err, deviceGroup) => {
        if (err) {
          return res.status(500).send('There was a problem adding the information to the database.')
        }
        res.status(200).send(deviceGroup)
      })
    },
  )
}
