var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

router.get('/create', function(request, respond){
	
	var person = new User({
		fullname: 'king',
		username: 'king',
		email: 'surya.ramshere@gmail.com',
		password: 'test',
		role: 'admin',
		phone: 085723002470
	});

	person.save(function(err){
		if (err) {
			respond.send('User has been created');			
		}else{
			respond.send('Error insert database');
		}
	});
});

router.get('/all', function(request,respond){
	User.find(function(err, data){
		if (err) {
			respond.status(500).send('Error get data');			
		}else{
			respond.send(data);
		}
	});
});

module.exports = router;