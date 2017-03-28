var express = require('express'),
	router = express.Router(),
	DonorModel = require('../models/donorinfo');
	CharityModel = require('../models/charityinfo');
	UserModel = require('../models/userinfo');
	
router.get('/',function(req, res){
	//var userId = req.user.aud;
	var userId = req.user.sub;

	DonorModel.find({userId: userId},'',function(err,donor){
		console.log(donor)
		if (err) console.error(err);
		if (donor.length) {
			console.log(donor.length)
		res.send('donorhtml');
		} else {
			CharityModel.find({userId: userId},'',function(err,char){
				console.log(char.length)
				if (err) console.error(err);
				if(char.length) {
					res.send('charhtml');
				} else {
					res.send('newaccount');
						}
			});
		}
	});		
});

router.get('/getdonor',function(req,res){
	var userId = req.user.sub
	DonorModel.findOne({userId: userId},'',function(err,donor){
		if (err) console.error('Error getting', err);
		res.json(donor);
	});
})
	

router.post('/',function(req, res){
	var donorInfo = {
		userId: req.user.sub,
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		city: req.body.city,
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
		fullName: req.body.fullName,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip
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