var mqtt = require('mqtt');

var clientMqtt = mqtt.connect({
    host: `168.62.43.5`,
    protocol: 'mqtt',
    port: 1883,
    clientId: 'clientTest'
});

clientMqtt.on('connect', function () {
    console.log('connected to mqtt broker');
    clientMqtt.subscribe('demo', function (err) {
        // if (!err) {
        // }
    });
    clientMqtt.on('message', function (topic, message) {
        // message is Buffer
        //console.log(message.toString())
        //content = JSON.parse(message.toString());
        console.log("recvfromMQTT => ", message.toString());
    });

})
clientMqtt.on('error', (err) => {
    console.log('error on clientMqtt');
    console.log(err.toString());
});

//test
setInterval(() => {
    clientMqtt.publish(
        'demo',
        JSON.stringify({
            humidityLand: Math.floor(Math.random() * 100),
            humidityAir: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 100),
        })
    );
}, 2000);