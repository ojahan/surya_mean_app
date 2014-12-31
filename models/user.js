
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fullname: {
		type: String,
		require: true
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
		require: true
	},
	role: {
		type: String,
		enum: ['Admin','Coach','Player'],
		require: true
	},
	phone: {
		type: Number,
		require: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.genSalt(10, function(err,salt){
		if (err) return next(err) ;
		bcrypt.hash(user.password, salt, function(err,hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(password){
	var match = undefined;
	bcrypt.compare(this.password, password, function(error, isMatch){
		if (error) console.log(error);
		match = isMatch;
	});
	return match;
};

module.exports = mongoose.model('User', UserSchema);