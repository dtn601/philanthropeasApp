var express = require('express'),
	router = express.Router(),
	CharityModel = require('../models/charityinfo.js');


router.get('/',function(req, res){
	CharityModel.find({},'',function(err,charity){
		if (err) console.error('Error getting', err);
		res.json(charity);
	});
});

router.post('/',function(req, res){
	var charityInfo = {
		userId: req.body.userId,
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause


	};

	var newCharity = new ChairtyModel(charityInfo);

	newCharity.save(function(err,success){
		res.json(success);
	});
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		userId: req.body.userId,
		charity: req.body.charity,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		dropoff: req.body.dropoff,
	};
	CharityModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	CharityModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});


module.exports = router;
