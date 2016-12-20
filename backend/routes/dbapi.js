
var express = require('express'),
	router = express.Router(),
	DonerModel = require('../models/donerinfo');

router.get('/',function(req, res){
	DonerModel.find({},'',function(err,doners){
		if (err) console.error('Error getting', err);
		res.json(doners);
	});
});

router.post('/',function(req, res){
	var donerInfo = {
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause


	};

	var newDoner = new DonerModel(donerInfo);

	newDoner.save(function(err,success){
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
	DonerModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	DonerModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

module.exports = router;