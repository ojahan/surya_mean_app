var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = require('../models/user'),
	flash = require('connect-flash'),
	passport = require('../config/auth').passport,	
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	isLoggedIn = require('../config/auth').isLoggedIn;

router.use(cookieParser('surya'));
router.use(session({secret:'surya', resave: false, saveUninitialized: true}));
router.use(flash());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', function(req, res) {	
	res.render('index',{});
});

router.get('/login', function(req, res){
	res.render('login', {});
});

router.post('/login', function(req,res,next){
	console.log('hit login');
	passport.authenticate('local', function(err, user, info){
		if (err) {
			return next(err);
		};
		if (!user) {
			return res.send(info.message);
		};
		req.login(user, function(err){
			if (err) { return next(err) };
			return res.send(user);
		});
	})(req,res,next);
});

router.get('/notauth', function(req,res){
	res.send({message: 'Allowed'});
});

router.get('/needauth', isLoggedIn, function(req,res){
	res.send({message:'Not Need Auth'});
});

module.exports = router;