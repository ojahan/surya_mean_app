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

