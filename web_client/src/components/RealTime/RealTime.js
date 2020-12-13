import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Row, Col, Button, Progress, Label } from 'antd';
import { useEffect, useState } from 'react';
import {
    notifFailure,
    notifSuccess,
    notifFailureMes,
} from '../Shared/Notification';
import { Line } from '@ant-design/charts';
import moment from 'moment';

var mqtt = require('mqtt');

var newDataHumidityLand = [
    { time: '00:00', value: 0 },
    { time: '00:01', value: 1 },
    { time: '00:02', value: 2 },
    { time: '00:03', value: 3 },
    { time: '00:04', value: 4 },
    { time: '00:05', value: 5 },
    { time: '00:06', value: 6 },
    { time: '00:07', value: 7 },
    { time: '00:08', value: 8 },
];

var newDataHumidityAir = [
    { time: '00:00', value: 0 },
    { time: '00:01', value: 1 },
    { time: '00:02', value: 2 },
    { time: '00:03', value: 3 },
    { time: '00:04', value: 4 },
    { time: '00:05', value: 5 },
    { time: '00:06', value: 6 },
    { time: '00:07', value: 7 },
    { time: '00:08', value: 8 },
];
var newDataTemperature = [
    { time: '00:00', value: 0 },
    { time: '00:01', value: 1 },
    { time: '00:02', value: 2 },
    { time: '00:03', value: 3 },
    { time: '00:04', value: 4 },
    { time: '00:05', value: 5 },
    { time: '00:06', value: 6 },
    { time: '00:07', value: 7 },
    { time: '00:08', value: 8 },
];
function RealTime(props) {
    var a = 1;
    const [dataHumidityLand, setDataHumidityLand] = useState([
        { time: '00:00', value: 0 },
        { time: '00:01', value: 1 },
        { time: '00:02', value: 2 },
        { time: '00:03', value: 3 },
        { time: '00:04', value: 4 },
        { time: '00:05', value: 5 },
        { time: '00:06', value: 6 },
        { time: '00:07', value: 7 },
        { time: '00:08', value: 8 },
    ]);
    const config = {
        height: 200,
        xField: 'time',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    const [dataHumidityAir, setDataHumidityAir] = useState([
        { time: '00:00', value: 0 },
        { time: '00:01', value: 1 },
        { time: '00:02', value: 2 },
        { time: '00:03', value: 3 },
        { time: '00:04', value: 4 },
        { time: '00:05', value: 5 },
        { time: '00:06', value: 6 },
        { time: '00:07', value: 7 },
        { time: '00:08', value: 8 },
    ]);

    const [dataTemperature, setDataTemperature] = useState([
        { time: '00:00', value: 0 },
        { time: '00:01', value: 1 },
        { time: '00:02', value: 2 },
        { time: '00:03', value: 3 },
        { time: '00:04', value: 4 },
        { time: '00:05', value: 5 },
        { time: '00:06', value: 6 },
        { time: '00:07', value: 7 },
        { time: '00:08', value: 8 },
    ]);
    const [temp, setTemp] = useState(0);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [humidityLand, setHumidityLand] = useState(0);
    const [humidityAir, setHumidityAir] = useState(0);
    const [temperature, setTemperature] = useState(0);
    useEffect(() => {
        const client = mqtt.connect({
            host: 'localhost',
            protocol: 'ws',
            port: 9001,
        });
        client.on('connect', () => {
            console.log('connecting...');
            setConnectionStatus(true);
            client.subscribe('local', function (err) {
                if (!err) {
                    console.log('Subcribing to MQTT Broker!');
                }
            });
        });
        client.on('error', () => {
            notifFailureMes(null, 'Error connect to mqtt broker!');
        });
        client.on('disconnect', () => {
            notifFailureMes('Mqtt disconnecting...');
        });
        // client.on('close', () => { notifFailureMes("Mqtt disconnected !",) });
        client.on('message', async function (topic, message) {
            // message is Buffer
            let content = JSON.parse(message.toString());
            //console.log(content);

            setHumidityAir(parseFloat(content.humidityAir));
            setHumidityLand(parseFloat(content.humidityLand));
            setTemperature(parseFloat(content.temperature));

            newDataHumidityLand.shift();
            newDataHumidityLand.push({ time: moment().format('mm:ss'), value: parseInt(content.humidityLand) });
            setDataHumidityLand(newDataHumidityLand.slice());
            console.log(newDataHumidityLand.slice());
            newDataTemperature.shift();
            newDataTemperature.push({ time: moment().format('mm:ss'), value: parseInt(content.temperature) });
            setDataTemperature(newDataTemperature.slice());

            newDataHumidityAir.shift();
            newDataHumidityAir.push({ time: moment().format('mm:ss'), value: parseInt(content.humidityAir) });
            setDataHumidityAir(newDataHumidityAir.slice());
        });
    }, []);

    // function tick() {
    //     temp = temp +1;
    //     setTemp(temp);
    //     a=a+1;
    // }
    return (
        <div>
            <Row gutter={24}>
                <Col span={8}>
                    <div className="_center">
                        <h3>Humidity Land</h3>
                        <Progress
                            type="circle"
                            percent={humidityLand}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <div className="_center">
                        <h3>Humidity Air</h3>
                        <Progress type="circle" percent={humidityAir} />
                    </div>
                </Col>
                <Col span={8}>
                    <div className="_center">
                        <h3>Temperature</h3>
                        <Progress type="circle" format={(percent) => `${percent} *C`} percent={temperature} />
                    </div>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col span={8} style={{ padding: '10px' }}>
                    <Line {...config} data={dataHumidityLand} />
                </Col >
                <Col span={8} style={{ padding: '10px' }}>
                    <Line {...config} data={dataHumidityAir} />
                </Col >
                <Col span={8} style={{ padding: '10px' }}>
                    <Line {...config} data={dataTemperature} />
                </Col>
            </Row>
        </div>
    );
}

RealTime.propTypes = {};

export default RealTime;
