'use strict';

var Device = require('./device.model');
var { CloudMqttAPI } = require('../../utils/CloudMqttAPI');
var cloudMqttApi = new CloudMqttAPI();

exports.create = function (req, res) {
    Device.findOne({serial: req.body.serial}, function(err, device) {
        if (device) {
            return res.status(401).send("Serial is already taken.");
        }
        if (err) {
            return res.status(500).send("There was a problem adding the information to the database.");
        }

        var newDevice = {
            name: req.body.name,
            password: req.body.password,
            serial: req.body.serial,
            createdBy: req.user.id,
            group: null
        };

        var userRegisteredCallback = function(registered) {
            if (!registered) {
                return res.status(500).send("There was a problem with registering device in cloud.");
            }

            Device.create(newDevice,
                function (err, device) {
                    if (err) {
                        console.log(err)
                        return res.status(500).send("There was a problem adding the information to the database.");
                    }
                    res.status(200).send(device);
                });
        };
        cloudMqttApi.createUser(newDevice, userRegisteredCallback);
    });
};

/*
* Gets users device data information
* return
* */
exports.index = function (req, res) {
    Device.find({
        createdBy: req.user.id
    }).populate('status', 'data').exec( function (err, device) {
        if (err) {
            return res.status(500).send("There was a problem finding the device.");
        }
        if (!device) {
            return res.status(404).send("No device found.");
        }
        res.status(200).send(device);
    });
};

/*
* Gets single users device data information
* return
* */
exports.show = function (req, res) {
    Device.findOne({
        _id: req.params.id,
        createdBy: req.user.id
    }).populate('status', 'data').exec( function (err, device) {
        if (err) {
            return res.status(500).send("There was a problem finding the device.");
        }
        if (!device) {
            return res.status(404).send("No device found.");
        }
        res.status(200).send(device);
    });
};

/*
* Delete device
* return
* */
exports.destroy = function (req, res) {
    Device.findOne({
        _id: req.params.id,
        createdBy: req.user.id
    }, function (err, device) {
        if (err || !device) {
            return res.status(500).send("There was a problem deleting the device.");
        }
        var userDeletedCallback = function(deleted) {
            if (!deleted) {
                return res.status(500).send("There was a problem deleting the device from cloud");
            }
            device.remove();
            res.status(200).send("Device "+ device.name +" was deleted.");
        };
        cloudMqttApi.deleteUser(device, userDeletedCallback);
    });
};

/*
* Edit device
* return
* */
exports.update = function (req, res) {
    Device.findOneAndUpdate({
        _id: req.params.id,
        createdBy: req.user.id
    }, req.body, { new: true }, function (err, device) {
        if (err || !device) {
            console.log(err);
            return res.status(500).send("There was a problem updating the device.");
        }
        res.status(200).send(device);
    });
};