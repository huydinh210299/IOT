require('dotenv').config();
var mqtt = require('mqtt');
var clientWs = mqtt.connect(`ws://${process.env.IP}:9001`, { clientId: 'clientWs' });
clientWs.on('connect', function () {
    console.log('connected to broker via ws !');
    clientWs.subscribe('realtimeweb', function (err) {
        // if (!err) {
        //     setInterval(() => {
        //         clientLocal.publish('presence', 'Hello mqtt')
        //     }, 2000);
        // }
    })
    clientWs.on('message', function (topic, message) {
        // message is Buffer
        const recvFromSocket = JSON.parse(message.toString()) || '';
        console.log('recvfromSOCKET =>', recvFromSocket);
    });
})

clientWs.on('error', (err) => {
    console.log('error on clientWs');
    console.log(err.toString());
});

//============================================mqtt
var clientMqtt = mqtt.connect({
    host: `${process.env.IP}`,
    protocol: 'mqtt',
    port: 1883
});

clientMqtt.on('connect', function () {
    console.log('connected to mqtt broker');
    clientMqtt.subscribe('demo', function (err) {
        // if (!err) {
        // }
    });
    clientMqtt.on('message', async function (topic, message) {
        // message is Buffer
        //console.log(message.toString())
        //content = JSON.parse(message.toString());
        console.log("recvfromMQTT => ", message.toString());
        clientWs.publish('realtimeweb', message.toString());
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
}, 1000);