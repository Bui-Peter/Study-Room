const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OpenRoomSchema = new Schema({
	roomID: Number,
	open: {date: String, time: [String]},
	capacity: Number
});

module.exports = mongoose.model('OpenRoom', OpenRoomSchema)