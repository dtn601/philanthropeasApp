var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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

var model = mongoose.model('Charity', schema);

// Make this available to our other files
module.exports = model;