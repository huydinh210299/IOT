import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Row, Col, Button, Progress, Label } from 'antd';
import { useEffect, useState } from 'react';
import {
  notifFailure,
  notifSuccess,
  notifFailureMes,
} from '../Shared/Notification';
var mqtt = require('mqtt');

function RealTime(props) {
  var a = 1;
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
      console.log(content);
      setHumidityAir(parseFloat(content.humidityAir));
      setHumidityLand(parseFloat(content.humidityLand));
      setTemperature(parseFloat(content.temperature));
    });
  }, []);

  // function tick() {
  //     temp = temp +1;
  //     setTemp(temp);
  //     a=a+1;
  // }
  return (
    <Row gutter={16}>
      <Col span={8}>
        <div className="_center">
          <h3>Humidity Land</h3>
          <Progress
            type="circle"
            format={(percent) => `${percent} *C`}
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
          <Progress type="circle" percent={temperature} />
        </div>
      </Col>
    </Row>
  );
}

RealTime.propTypes = {};

export default RealTime;
