var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	_id : {
		type: Number,
		require: true
	},
	team_name: {
		type: String,
		require: true 
	},
	team_organization: {
		type: String,
		require: true
	},
	team_regional: {
		type: String,
		require: true
	},
	users : [{ 
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('Team', TeamSchema );