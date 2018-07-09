'use strict'

var Data = require('./data.model')
var Device = require('../device/device.model')
var Status = require('../status/status.model')

exports.index = (req, res) => {
  const data = [
    {
      id: 'lastSwitchOn',
      title: 'Last switch on',
      subtitle: '',
      additionalInfo: 'test',
      additionalInfo2: 'test2',
      backgroundColor: '#177F8A',
      icon: 'ios-analytics',
    },
    {
      id: 'lastSwitchOn',
      title: 'Last switch on',
      subtitle: '',
      additionalInfo: 'test',
      additionalInfo2: '2017-02-19 22:12:00',
      backgroundColor: '#4C8DCA',
      icon: 'ios-archive',
    },
    {
      id: 'lastSwitchOn',
      title: 'Last switch on',
      subtitle: '',
      additionalInfo: 'test',
      additionalInfo2: 'test2',
      backgroundColor: '#0CEBC7',
      icon: 'ios-bulb-outline',
    },
    {
      id: 'lastSwitchOn',
      title: 'Last switch on',
      subtitle: '',
      additionalInfo: 'test',
      additionalInfo2: 'test2',
      backgroundColor: '#385DCA',
      icon: 'ios-flame-outline',
    },
  ]

  res.status(200).send(data)
}
