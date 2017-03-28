var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: { type: String, required: true },
	type: { type: String, required: true }
});

var model = mongoose.model('users', schema);

// Make this available to our other files
module.exports = model;