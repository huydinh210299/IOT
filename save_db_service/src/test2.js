var mqtt = require('mqtt');
var clientWs = mqtt.connect(`ws://iot.ithust.xyz:9001`, { clientId: 'clientWs' });
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

//test
setInterval(() => {
    clientWs.publish(
        'realtimeweb',
        JSON.stringify({
            humidityLand: Math.floor(Math.random() * 100),
            humidityAir: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 100),
        })
    );
}, 2000);