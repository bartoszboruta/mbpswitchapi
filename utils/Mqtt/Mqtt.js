var mqtt = require('mqtt')

module.exports = class Mqtt {
  publish(device, data, callback) {
    if (!device || !device.serial || !device.password) {
      return callback(false)
    }

    var options = {
      port: process.env.MQTT_BROKER_PORT,
      username: device.serial.toString(),
      password: device.password,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clientId:
        'mqttjs_' +
        Math.random()
          .toString(16)
          .substr(2, 8),
    }

    var client = mqtt.connect(
      process.env.MQTT_BROKER_URL,
      options,
    )

    client.on('connect', () => {
      client.publish(device.serial.toString(), data, () => {
        client.end()
        callback(true)
      })
    })
  }
}
