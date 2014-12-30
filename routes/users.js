var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session');

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
router.use(session({ secret: 'iloveu', resave: false,
                saveUninitialized: true }));

router.get('/create', function(request, respond){	
	var person = new User({
		fullname: "testing",
		username: "ttest",
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

router.get('/all', isLoggedIn, function(request,respond){
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
})

function isLoggedIn(request,respond,next){
	if (request.isAuthenticated()) {
		next();
	};
	respond.redirect('/')
};

module.exports = router;