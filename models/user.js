
var mongoose = require('mongoose');
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

// console.log('model loaded');

module.exports = mongoose.model('User', UserSchema);