const express = require('express');
const router = express.Router();

var axios = require('axios');

var url = "https://gmu.libcal.com/ajax/space/book";

router.post('/', (req, res) => {
    console.log("reserving room");
    //console.log(req.body.bookings);
});

router.get('/', (req, res) => {

    var data = {
        formData: {
            fname: 'Peter',
            lname: 'Bui',
            email: 'pbui8@masonlive.gmu.edu'
        },
        booking: {
            id: 1,
            eid: 8102,
            gid: 2118,
            lid: 1205,
            start: '2019-08-15 15:30',
            end: '2019-08-15 17:30'
        },
    };


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

    //console.log(data.booking);

    //eid
    // 8200 - 8204 = 1201 - 1205 (lobby)
    // 8060, 8063, 8067, 8068, 8069, 8070, 8071, 8072, 8073, 8074, 8075, 8076, 8077, 8079, 8079 = 1012, 1707, 3606, 3608, 3609, 3610, 3702, 3706, 3708, 4612, 4613, 4614, 4702, 4706, 4708 (room for 2)
    // 8085, 8086, 8087, 8088, 8089. 8090, 8091, 8092, 8093, 8094, 8095, 8100, 8097, 8098, 8099, 8101 = 2004, 3104, 3105, 3106, 3107, 3109, 3110, 3201, 3202, 3401, 3402, 4002, 4009, 4105, 4201, 4202 (4 people room)
    // 8102, 8104, 8106, 8107, 8103, 8108, 8109, 8110, 8111 = 3002, 3605, 3705, 3713, 4003, 4603, 4701, 4705, 4713 (6 people room)
    // 8112 - 8116 = 3101, 3103, 4103, 4104, 4106 (8 people room)
    // 8117, 8118 = 3102, 3111

    axios.post(url, 'formData%5Bfname%5D=Peter&formData%5Blname%5D=Bui&formData%5Bemail%5D=pbui8%40masonlive.gmu.edu&forcedEmail=&bookings%5B0%5D%5Bid%5D=1&bookings%5B0%5D%5Beid%5D=8200&bookings%5B0%5D%5Bgid%5D=2142&bookings%5B0%5D%5Blid%5D=1205&bookings%5B0%5D%5Bstart%5D=2019-08-15+14%3A00&bookings%5B0%5D%5Bend%5D=2019-08-15+14%3A30&returnUrl=%2Fspaces', config)
        .then(info => console.log(info.request))
        .catch(error => console.log(error));

    res.send("save server");
})

module.exports = router;