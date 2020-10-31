const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
	humidityLand: {
		type: Number,
		required: true,
	},
	humidityAir: {
		type: Number,
		required: true,
	},
	temperature: {
		type: Number,
		required: true,
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

module.exports = mongoose.model('Sensor', sensorSchema);
