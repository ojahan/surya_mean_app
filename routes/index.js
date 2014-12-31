var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = require('../models/user'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username: username},function(err, user){
		if (err) return done(err);
		if (!user.comparePassword(password)) {
			return done(null, false, {message: 'user not found'});
		};
		return done(null, user);
	});
}));

/* GET home page. */
router.get('/', function(req, res) {	
	res.render('index',{});
});

router.get('/login', function(req, res){
	res.render('login', {});
});

router.post('/login', passport.authenticate('local', {successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true}  ));

module.exports = router;