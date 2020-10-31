var mqtt = require('mqtt');
const mongoose = require('mongoose');

const Sensor = require('../models/Sensor');

//Connect to mongodb database
mongoose.connect(process.env.DATABASE_URL || 'localhost:27017/iot', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

var client = mqtt.connect({
	host: '52.229.154.12',
});

client.on('connect', function () {
	client.subscribe('demo', function (err) {
		if (!err) {
			console.log('Subcribing to MQTT Broker!');
		}
	});
});

client.on('message', function (topic, message) {
	// message is Buffer
    console.log(message.toString());

    //Create a new Sensor
	const sensor = new Sensor({
		humidityLand: message.humidityLand,
		humidityAir: message.humidityAir,
		temperature: message.temperature,
	});
	try {
		const savedSensor = await sensor.save();
		console.log(savedSensor)
	} catch (err) {
		console.error(err)
	}

	client.end();
});
