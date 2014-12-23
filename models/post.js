var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	content: String,
	created_at: date,	
});

mongoose.model('Post', postSchema);