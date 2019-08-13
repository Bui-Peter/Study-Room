const express = require('express');
const router = express.Router();

var axios = require('axios');

var url = "https://gmu.libcal.com/ajax/space/book";

router.post('/', (req, res) => {
    console.log("reserving room");
});

router.get('/', (req, res) => {
    res.send("save server");

    var form = "";
    var booking = "";


    var data = {
        formData: form,
        bookings: booking
    }

    axios.post(url, data);
})

module.exports = router;