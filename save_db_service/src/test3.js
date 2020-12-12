var mqtt = require('mqtt');
//============================================mqtt
var clientMqtt_2 = mqtt.connect({
    host: `52.229.154.12`,
    protocol: 'mqtt',
    port: 1883,
    clientId: 'clientMqtt_2'
});

clientMqtt_2.on('connect', function () {
    console.log('connected to mqtt broker 52.229.154.12');
    clientMqtt_2.subscribe('demo', function (err) {
        // if (!err) {
        // }
    });
    clientMqtt_2.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        //content = JSON.parse(message.toString());
    });

})
clientMqtt_2.on('error', (err) => {
    console.log('error on clientMqtt_2');
    console.log(err.toString());
});

//test
setInterval(() => {
    clientMqtt_2.publish(
        'demo',
        JSON.stringify({
            humidityLand: Math.floor(Math.random() * 100),
            humidityAir: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 100),
        })
    );
}, 2000);