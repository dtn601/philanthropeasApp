
var express = require('express'),
	router = express.Router(),
	DonorModel = require('../models/donorinfo');

router.get('/',function(req, res){
	DonorModel.find({},'',function(err,donors){
		if (err) console.error('Error getting', err);
		res.json(donors);
	});
});

router.post('/',function(req, res){
	var donorInfo = {
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause


	};

	var newDonor = new DonorModel(donorInfo);

	newDonor.save(function(err,success){
		res.json(success);
	});	
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause
	};
	DonorModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	DonorModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

module.exports = router;