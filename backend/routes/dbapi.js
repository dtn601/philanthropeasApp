
var express = require('express'),
	router = express.Router(),
	DonorModel = require('../models/donorinfo');
	CharityModel = require('../models/charityinfo');
	
router.get('/',function(req, res){
	var userId = req.user.aud;
	//var userId = req.body.id

	DonorModel.find({userId: userId},'',function(err,donor){
		console.log(donor)
		if (err) console.error(err);
		if (donor) {
			console.log(donor)
		res.send('donerhtml');
		} else {
			CharityModel.find({userId: userId},'',function(err,char){
				console.log(char)
				if (err) console.error(err);
				if(char) {
					res.send('charhtml');
				} else {
					res.sent('newaccount');
						}
			});
		}
	});		
});
	

router.post('/',function(req, res){
	var donorInfo = {
		userId: req.user.aud,
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
		if (err) console.log(err);
		res.json(success);
	});
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		userId: req.body.aud,
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
