var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: { type: String, requires: true },
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String, required: true },
	importance: { type: String, required: true },
	cause: { type: String, required: true }
});

var model = mongoose.model('donors', schema);

// Make this available to our other files
module.exports = model;
