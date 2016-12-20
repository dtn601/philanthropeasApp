var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: { type: String, required: true },
	charity: { type: String, required: true }, 
	email: { type: String, required: true },
	address: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String, required: true },
	dropoff: { type: String, required: true },
	needs: String,
	limitations: String,
	instructions: String,

});

var model = mongoose.model('charitys', schema);

// Make this available to our other files
module.exports = model;
