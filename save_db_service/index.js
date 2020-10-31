require('dotenv').config();

const mqtt = require('mqtt');
const mongoose = require('mongoose');

const Sensor = require('./models/Sensor');

//Connect to mongodb database
mongoose.connect(process.env.DATABASE_URL || 'localhost:27017/iot', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

var client = mqtt.connect({
	host: '52.229.154.12',
});

client.on('connect', function () {
	client.subscribe('demo', function (err) {
		if (!err) {
			console.log('Subcribing to MQTT Broker!');
			client.publish(
				'demo',
				JSON.stringify({
					humidityLand: 40,
					humidityAir: 50,
					temperature: 25,
				})
			);
		}
	});
});

db.once('open', () => {
	console.log('Connected to Database');

	client.on('message', async function (topic, message) {
		// message is Buffer
		// console.log(message.toString());
		let content = JSON.parse(message.toString());
		console.log(content);
		//Create a new Sensor
		const sensor = new Sensor({
			humidityLand: content.humidityLand,
			humidityAir: content.humidityAir,
			temperature: content.temperature,
		});
		try {
			const savedSensor = await sensor.save();
			console.log('Saved to db');
			console.log(savedSensor);
		} catch (err) {
			console.error(err);
		}
	});
});
