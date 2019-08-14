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
        forcedEmail: '',
        booking: {
            id: 1,
            eid: 8102,
            gid: 2118,
            lid: 1205,
            start: '2019-08-14 15:30',
            end: '2019-08-14 17:30'
        },
        returnURL: '/spaces'
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

    axios.post(url, data, config)
        .then(info => console.log(info))
        .catch(error => console.log(error));

    res.send("save server");
})

module.exports = router;