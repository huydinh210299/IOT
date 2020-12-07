import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '@ant-design/charts';
import { Row, Col, Button, Progress, Label } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Statistic(props) {

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
  const configHumidityLand = {
    data: dataHumidityLand,
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
    { time: '00:01', value: 0 },
    { time: '00:02', value: 0 },
    { time: '00:03', value: 0 },
    { time: '00:04', value: 0 },
    { time: '00:05', value: 0 },
    { time: '00:06', value: 0 },
    { time: '00:07', value: 0 },
    { time: '00:08', value: 0 },
    { time: '00:09', value: 0 },
  ]);
  const configHumidityAir = {
    data: dataHumidityAir,
    height: 200,
    xField: 'time',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  const [dataTemperature, setDataTemperature] = useState([
    { time: '00:00', value: 0 },
    { time: '00:01', value: 0 },
    { time: '00:02', value: 0 },
    { time: '00:03', value: 0 },
    { time: '00:04', value: 0 },
    { time: '00:05', value: 0 },
    { time: '00:06', value: 0 },
    { time: '00:07', value: 0 },
    { time: '00:08', value: 0 },
    { time: '00:09', value: 0 },
  ]);
  const configTemperature = {
    data: dataTemperature,
    height: 200,
    xField: 'time',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <Line {...configHumidityLand} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Line {...configHumidityAir} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Line {...configTemperature} />
        </Col>
      </Row>
    </div>)
}

Statistic.propTypes = {};

export default Statistic;