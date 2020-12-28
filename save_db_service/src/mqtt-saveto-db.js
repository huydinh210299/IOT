require('dotenv').config();
//IP=168.62.43.5
//IP2=52.229.154.12
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Sensor = require('../models/Sensor');

//========================================================= client mqtt
//Connect to mongodb database
mongoose.connect(process.env.DATABASE_URL || 'localhost:27017/iot', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

var clientMqtt = mqtt.connect({
    host: `${process.env.IP}`,
    protocol: 'mqtt',
    port: 1883,
    clientId:'clientdb'
});

clientMqtt.on('connect', function () {
    clientMqtt.subscribe('demo', function (err) {
        if (!err) {
            console.log('Subcribing to MQTT Broker!');
            //test
            // clientMqtt.publish(
            // 	'demo',
            // 	JSON.stringify({
            // 		humidityLand: 40,
            // 		humidityAir: 50,
            // 		temperature: 25,
            // 	})
            // );
        }
    });
});

db.once('open', () => {
    console.log('Connected to Database');
    clientMqtt.on('message', async function (topic, message) {
        //test
        //console.log(`${topic.toString()}=>${message.toString()}`);

        // message is Buffer
        if (topic.toString() == 'demo') {
            let content = JSON.parse(message.toString());
            //Save to db
            //Create a new Sensor
            const sensor = new Sensor({
                humidityLand: content.humidityLand,
                humidityAir: content.humidityAir,
                temperature: content.temperature,
            });
            try {
                const savedSensor = await sensor.save();
                console.log('[Saved DB] =>', savedSensor);
            } catch (err) {
                console.error(err);
            }
        }
    });
});
