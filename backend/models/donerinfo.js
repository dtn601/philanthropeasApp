var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	fullName: { type: String, required: true }, 
	email: { type: String, required: true },
	address: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String, required: true },

});

var model = mongoose.model('Doner', schema);

// Make this available to our other files
module.exports = model;