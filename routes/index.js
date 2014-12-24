var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {	
	res.render('index',{});
});

module.exports = router;
