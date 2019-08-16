const express = require('express');
const router = express.Router();

var axios = require('axios');

var url = "https://gmu.libcal.com/ajax/space/book";

var roomCoord = new Map();

    //eid
    // 8200 - 8204 = 1201 - 1205 (lobby)
    // 8060, 8063, 8067, 8068, 8069, 8070, 8071, 8072, 8073, 8074, 8075, 8076, 8077, 8078, 8079 = 1012, 1707, 3606, 3608, 3609, 3610, 3702, 3706, 3708, 4612, 4613, 4614, 4702, 4706, 4708 (room for 2)
    // 8085, 8086, 8087, 8088, 8089. 8090, 8091, 8092, 8093, 8094, 8095, 8100, 8097, 8098, 8099, 8101 = 2004, 3104, 3105, 3106, 3107, 3109, 3110, 3201, 3202, 3401, 3402, 4002, 4009, 4105, 4201, 4202 (4 people room)
    // 8102, 8104, 8106, 8107, 8103, 8108, 8109, 8110, 8111 = 3002, 3605, 3705, 3713, 4003, 4603, 4701, 4705, 4713 (6 people room)
    // 8112 - 8116 = 3101, 3103, 4103, 4104, 4106 (8 people room)
    // 8117, 8118 = 3102, 3111 (presentation room)

// lobby assignments
for(var i = 0; i <= 5; i++) roomCoord.set(1201 + i, 8200 + i);

// 2
roomCoord.set(1012, 8060);
roomCoord.set(1707, 8063);
roomCoord.set(3606, 8067);
roomCoord.set(3608, 8068);
roomCoord.set(3609, 8069);
roomCoord.set(3610, 8070);
roomCoord.set(3702, 8071);
roomCoord.set(3706, 8072);
roomCoord.set(3708, 8073);
roomCoord.set(4612, 8074);
roomCoord.set(4613, 8075);
roomCoord.set(4614, 8076);
roomCoord.set(4702, 8077);
roomCoord.set(4706, 8078);
roomCoord.set(4708, 8079);

//4
roomCoord.set(2004, 8085);
roomCoord.set(3104, 8086);
roomCoord.set(3105, 8087);
roomCoord.set(3106, 8088);
roomCoord.set(3107, 8089);
roomCoord.set(3109, 8090);
roomCoord.set(3110, 8091);
roomCoord.set(3201, 8092);
roomCoord.set(3202, 8093);
roomCoord.set(3401, 8094);
roomCoord.set(3402, 8095);
roomCoord.set(4002, 8100);
roomCoord.set(4009, 8097);
roomCoord.set(4105, 8098);
roomCoord.set(4201, 8099);
roomCoord.set(4202, 8101);

// 6
roomCoord.set(3002, 8102);
roomCoord.set(3605, 8104);
roomCoord.set(3705, 8106);
roomCoord.set(3713, 8107);
roomCoord.set(4003, 8103);
roomCoord.set(4603, 8108);
roomCoord.set(4701, 8109);
roomCoord.set(4705, 8110);
roomCoord.set(4713, 8111);

// 8
roomCoord.set(3101, 8112);
roomCoord.set(3103, 8113);
roomCoord.set(4103, 8114);
roomCoord.set(4104, 8115);
roomCoord.set(4106, 8116);

//presentation
roomCoord.set(8117, 3102);
roomCoord.set(8118, 3111);

router.post('/', (req, res) => {
    console.log("reserving room");
});

router.get('/', (req, res) => {

    console.log('Sending data...');

    var config = {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://gmu.libcal.com/spaces?lid=1205&gid=2118',
            'Sec-Fetch-Mode': 'cors',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        }

    } 
    // date format: 2019-08-15+14%3A30
    var fname = 'Peter';
    var lname = 'Bui';
    var email = 'pbui8';
    var eid = roomCoord.get(1205);
    var gid = 2116;
    var lid = 1205;
    var start = '2019-08-16+12%3A30';
    var end = '2019-08-16+15%3A30';

    var data = 'formData%5Bfname%5D=' + fname + '&formData%5Blname%5D=' + lname + '&formData%5Bemail%5D=' + email + '%40masonlive.gmu.edu&forcedEmail=&bookings%5B0%5D%5Bid%5D=1&bookings%5B0%5D%5Beid%5D=' + eid + '&bookings%5B0%5D%5Bgid%5D=' + gid + '&bookings%5B0%5D%5Blid%5D=' + lid + '&bookings%5B0%5D%5Bstart%5D=' + start + '&bookings%5B0%5D%5Bend%5D=' + end + '&returnUrl=%2Fspaces';

    axios.post(url, data, config)
        .then(info => console.log(info.data))
        .catch(error => console.log(error));

    res.send("save server");
})

module.exports = router;