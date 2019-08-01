const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OpenRoom = require('../models/OpenRoom.model');

mongoose.connect('mongodb+srv://Junjiy:Youtoo12@study-rooms-ao8dt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

mongoose.connection.on("error", error => {
	console.log("Database connection error: ", error);
});

mongoose.connection.once("open", () => {
	console.log("Connected to database!");
});

// Return the json of all the room data
router.get('/', function(req, res, next){
	OpenRoom.find({}, function(err, data){
		if(err) res.send(err);
		res.json(data);
	});
});


module.exports = router;