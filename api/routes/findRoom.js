const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

let OpenRoom = require('../models/OpenRoom.model');

// Connect o database
mongoose.connect('mongodb+srv://Junjiy:Youtoo12@study-rooms-ao8dt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

mongoose.connection.on("error", error => {
	console.log("Database connection error: ", error);
});

mongoose.connection.once("open", () => {
	console.log("Connected to database!");
});

// Routing
router.get('/', function(req, res, next){

    //refresh all the rooms by deleting
    OpenRoom.deleteMany({}, function(err){
        if(err) console.log("Error deleting open rooms");
        else {
            console.log("Removed Rooms");
            saveRoom();
        };
    })

    console.log("Scraping room...");    

    //find the current date, set it in the proper format
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    var date = year + "-" + month + "-" + day;
    
    //var date = "2019-08-01";
    console.log("Date: " + date);

    var roomNumber = new OpenRoom();


    /*
        Find times for all open rooms

        Room Size and the corresponding ID:
        Lobby = 2142,
        2 = 2116,
        4 = 2117,
        6 = 2118,
        8 = 2119
    */
    const saveRoom = async () => {
            for(var counter = 0; counter < 5; counter++){

                const roomSize = (counter == 0 ? 2142: 2115 + counter);
                
    
                //Note that prevGroupID and gid must be the same
                const url = "https://gmu.libcal.com/spaces/accessible/ajax/group?prevGroupId=" + roomSize + "&gid=" + roomSize + "&capacity=0&date=" + date;
    
                console.log("Saving room sizes:" + roomSize);
    
                await axios.get(url)
                .then(function(response){
    
                    if(response.status == 200){
                        const $ = cheerio.load(response.data);
    
                        $('.panel').each(function(i, element){
                            var openTime = [];
                            $(this).children('.panel-body').find('.checkbox').each(function(i, element){
                                openTime[i] = $(this).text().trim();
                            });
    
                            roomNumber = {
                                roomID: $(this).children('.panel-heading').text().trim().substring(0, 4),
                                open: {date: date, time: openTime},
                                capacity: $(this).children('.panel-heading').children('.pull-right').text().trim().substring(9, 11)
                            };
    
                            OpenRoom(roomNumber).save();
                        });
                    };     
                }, function(error) {console.log(error)});   
            };

            /*OpenRoom.find({}).sort({capacity: 'ascending'}).exec(function(err, response){
                if(err)
                    return console.log(err.message);
        
                console.log("Finished sorting!");
                res.send("Done");
            });
            */
    };

    //console.log("Saved Data.");

    const sortRoom = async () => {

    };

    //sortRoom();

    //res.redirect('../');
});

module.exports = router;