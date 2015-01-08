
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

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

UserSchema.methods.validPassword = function(password){
	if (this.password == password) {
		return true;
	}else{
		return false;
	};
};

module.exports = mongoose.model('User', UserSchema);