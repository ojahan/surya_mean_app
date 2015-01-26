
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var Promise = require("promise");

var UserSchema = new Schema({
	fullname: {
		type: String,
		require: false
	},
	username: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: false
	},
	role: {
		type: String,
		enum: ['Admin','Coach','Player'],
		require: false
	},
	phone: {
		type: Number,
		require: false
	},
	team : {
		type: Number,
		ref: 'Team'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10, function(err,hash){
		if (err) return next(err);
		user.password = hash;
		console.log(hash);
		next();
	});
});

UserSchema.methods.comparePassword = function(password,next){
	var user = this;
	var result = undefined;
	authPromise = new Promise(function(resolve,reject){
		bcrypt.compare( password, user.password, function(error, isMatch){
			if (error) console.log(error);
			resolve(isMatch);
		});
	});
	authPromise.then(function(data){
		next(data);
	},function(error){
		console.log(error)
	});	
};

UserSchema.methods.validPassword = function(password){
	if (this.password == password) {
		return true;
	}else{
		return false;
	};
};

module.exports = mongoose.model('User', UserSchema);