const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 30,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 128,
		min: 6,
	},
	role: {
		type: String,
		enum: ['admin', 'customer'],
		default: 'customer',
	},
	password: {
		type: String,
		required: true,
		max: 128,
		min: 6,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	modifiedDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
