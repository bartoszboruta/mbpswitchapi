'use strict';

var Data = require('./data.model');
var Device = require('../device/device.model');
var Status = require('../status/status.model');


/*
* Sets new status in status schema and adds to data
* DEPRECATED
* */
// exports.create = function (req, res) {
//     Device.findOne({_id: req.body.deviceId, createdBy: req.user.id}, function(err, device) {
//         if (!device) {
//             return res.status(401).send("No device found.");
//         }
//         if (err) {
//             return res.status(500).send("There was a problem adding the information to the database.");
//         }
//
//         Status.update({device: device}, {
//                 device: device,
//                 data: req.body.data
//             },
//             { upsert : true },
//             function (err) {
//                 if (err) {
//                     return res.status(500).send("There was a problem adding the information to the database status.");
//                 }
//                 Data.create({
//                         device: device,
//                         data: req.body.data
//                     },
//                     function (err, data) {
//                         if (err) {
//                             return res.status(500).send("There was a problem adding the information to the database data.");
//                         }
//                         res.status(200).send(data);
//                     });
//             });
//     });
// };
