'use strict';

var Data = require('./data.model');
var Device = require('../device/device.model');
var Status = require('../status/status.model');

exports.index = function (req, res) {

    const data =  [
        {
            id: 'lastSwitchOn',
            title: 'Last switch on',
            subtitle: '',
            additionalInfo: 'test',
            additionalInfo2: 'test2',
            backgroundColor: '#177F8A',
            icon: 'ios-analytics'
        },
        {
            id: 'lastSwitchOn',
            title: 'Last switch on',
            subtitle: '',
            additionalInfo: 'test',
            additionalInfo2: '2017-02-19 22:12:00',
            backgroundColor: '#4C8DCA',
            icon: 'ios-archive'
        },
        {
            id: 'lastSwitchOn',
            title: 'Last switch on',
            subtitle: '',
            additionalInfo: 'test',
            additionalInfo2: 'test2',
            backgroundColor: '#0CEBC7',
            icon: 'ios-bulb-outline'
        },
        {
            id: 'lastSwitchOn',
            title: 'Last switch on',
            subtitle: '',
            additionalInfo: 'test',
            additionalInfo2: 'test2',
            backgroundColor: '#385DCA',
            icon: 'ios-flame-outline'
        },
    ];

    res.status(200).send(data);


        // Device.find({
    //     createdBy: req.user.id
    // }).populate('status', 'data').exec( function (err, device) {
    //     if (err) {
    //         return res.status(500).send("There was a problem finding the device.");
    //     }
    //     if (!device) {
    //         return res.status(404).send("No device found.");
    //     }
    //     res.status(200).send(device);
    // });
};

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
