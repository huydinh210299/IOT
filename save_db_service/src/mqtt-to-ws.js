require('dotenv').config();
//IP=168.62.43.5
//IP2=52.229.154.12
var mqtt = require('mqtt');
var clientWs = mqtt.connect(`ws://168.62.43.5:9001`, { clientId: 'clientWs' });
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
    host: `168.62.43.5`,
    protocol: 'mqtt',
    port: 1883,
    clientId: 'clientMqtt'
});

clientMqtt.on('connect', function () {
    console.log('connected to mqtt broker ithust.xyz');
    clientMqtt.subscribe('demo', function (err) {
        // if (!err) {
        // }
    });
    clientMqtt.on('message', function (topic, message) {
        // message is Buffer
        //console.log(message.toString())
        //content = JSON.parse(message.toString());
        if (topic == 'demo') {
            console.log("recvfromMQTT => ", message.toString());
            clientWs.publish('realtimeweb', message.toString());
        }
    });

})
clientMqtt.on('error', (err) => {
    console.log('error on clientMqtt');
    console.log(err.toString());
});

//test
// setInterval(() => {
//     clientMqtt.publish(
//         'demo',
//         JSON.stringify({
//             humidityLand: Math.floor(Math.random() * 100),
//             humidityAir: Math.floor(Math.random() * 100),
//             temperature: Math.floor(Math.random() * 100),
//         })
//     );
// }, 1000);

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
        //console.log(message.toString())
        //content = JSON.parse(message.toString());
        clientWs.publish('realtimeweb', message.toString());
    });

})
clientMqtt_2.on('error', (err) => {
    console.log('error on clientMqtt_2');
    console.log(err.toString());
});