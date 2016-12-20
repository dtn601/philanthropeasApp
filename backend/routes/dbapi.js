
var express = require('express'),
	router = express.Router(),
	DonerModel = require('../models/donerinfo');

router.get('/',function(req, res){
	DonerModel.find({},'',function(err,post){
		if (err) console.error('Error getting', err);
		res.json(post);
	});
});

router.post('/',function(req, res){
	var donerInfo = {
		fullName: req.body.first_name,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip


	};

	var newDoner = new DonerModel(donerInfo);

	newDoner.save(function(err,success){
		res.redirect('/');
	});	
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		slack: req.body.slack
	};
	StudentModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	StudentModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

module.exports = router;