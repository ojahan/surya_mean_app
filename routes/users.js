var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Team = require('../models/team');
var errorHandler = require('errorhandler');

router.get('/create', function(request, respond){	
	var person = new User({
		fullname: "admin",
		username: "admin",
		email: "dre@gmail.com",
		password: 'test',		
		role: 'Admin',
		phone: 085723002470
	});
	person.save(function(err){
		if (err) {
			respond.send(err);
		}else{
			respond.send('User has been created');			
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

router.put('/update/:id', function(request,respond){
	var Person = User.findById(request.params.id, function(err, person){
		person.fullname = request.body.fullname;
		person.username = request.body.username;
		person.email = request.body.email;
		person.password = request.body.password;
		person.phone = request.body.phone;
	});
});

router.get('/', function(request, respond){
	respond.send('Not Authenticated');
});

router.post('/save_team', function(request, respond){
	var member = request.body.members,
		team = request.body.team,
		id = new Date();

	var group = new Team({_id: id.getTime(), 
							team_name: team.team_name,
							team_organization: team.team_organization,
							team_regional: team.team_regional });
	var person = [];
	group.save(function(err){
		if (err) return errorHandler(err) ;
		for (var i = 0; i < member.length; i++) {
			person[i] = new User({
				fullname :'',
				username: member[i].name,
				email: member[i].email,
				password: '',
				role: 'Player',
				phone: '',
				team: group._id
			});
			person[i].save(function(err){
				if (err) { return errorHandler(err) };
			});
		};
		console.log(member);
		console.log(request.body.team);
	});
	respond.send('Data team saved');
});

router.get("/populate", function(request,respond){
	User.find({username: 'asda'}).populate('team').exec(function(err,user){
		respond.send(user);
	});
});

module.exports = router;