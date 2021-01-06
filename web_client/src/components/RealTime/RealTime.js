import React from "react";
import PropTypes from "prop-types";
import { Statistic, Row, Col, Button, Progress, Label } from "antd";
import { useEffect, useState } from "react";
import {
  notifFailure,
  notifSuccess,
  notifFailureMes,
} from "../Shared/Notification";
import { Line } from "@ant-design/charts";
import moment from "moment";
import { Switch } from "antd";
import mqtt from "mqtt";

function RealTime(props) {
  const [dataHumidityLand, setDataHumidityLand] = useState([
    { time: "00:00", value: 0 },
    { time: "00:01", value: 1 },
    { time: "00:02", value: 2 },
    { time: "00:03", value: 3 },
    { time: "00:04", value: 4 },
    { time: "00:05", value: 5 },
    { time: "00:06", value: 6 },
    { time: "00:07", value: 7 },
    { time: "00:08", value: 8 },
  ]);
  const config = {
    height: 200,
    xField: "time",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const [dataHumidityAir, setDataHumidityAir] = useState([
    { time: "00:00", value: 0 },
    { time: "00:01", value: 1 },
    { time: "00:02", value: 2 },
    { time: "00:03", value: 3 },
    { time: "00:04", value: 4 },
    { time: "00:05", value: 5 },
    { time: "00:06", value: 6 },
    { time: "00:07", value: 7 },
    { time: "00:08", value: 8 },
  ]);

  const [dataTemperature, setDataTemperature] = useState([
    { time: "00:00", value: 0 },
    { time: "00:01", value: 1 },
    { time: "00:02", value: 2 },
    { time: "00:03", value: 3 },
    { time: "00:04", value: 4 },
    { time: "00:05", value: 5 },
    { time: "00:06", value: 6 },
    { time: "00:07", value: 7 },
    { time: "00:08", value: 8 },
  ]);
  const [temp, setTemp] = useState(0);
  const [demoId, setDemoId] = useState();
  //const [client, setClient] = useState(mqtt.connect(process.env.REACT_APP_MQTTWS));
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [humidityLand, setHumidityLand] = useState(0);
  const [humidityAir, setHumidityAir] = useState(0);
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    console.log("effect");
    const client = mqtt.connect(`ws://iot.ithust.xyz:9001`);
    client.on("connect", () => {
      notifSuccess("MQTT", "connected!");
      setConnectionStatus(true);
      client.subscribe("realtimeweb", function (err) {
        if (!err) {
          console.log("Subcribing to MQTT Broker!");
        }
      });
    });
    client.on("error", () => {
      notifFailureMes(null, "Error connect to mqtt broker!");
    });
    client.on("disconnect", () => {
      notifFailureMes("Mqtt disconnecting...");
    });
    // client.on('close', () => { notifFailureMes("Mqtt disconnected !",) });
    client.on("message", function (topic, message) {
      // message is Buffer
      let content = JSON.parse(message.toString());
      //console.log(content);

      setHumidityAir(parseFloat(content.humidityAir));
      setHumidityLand(parseFloat(content.humidityLand));
      setTemperature(parseFloat(content.temperature));

      dataHumidityLand.shift();
      dataHumidityLand.push({
        time: moment().format("mm:ss"),
        value: parseInt(content.humidityLand),
      });
      setDataHumidityLand(dataHumidityLand.slice());
      console.log(dataHumidityLand);
      dataTemperature.shift();
      dataTemperature.push({
        time: moment().format("mm:ss"),
        value: parseInt(content.temperature),
      });
      setDataTemperature(dataTemperature.slice());

      dataHumidityAir.shift();
      dataHumidityAir.push({
        time: moment().format("mm:ss"),
        value: parseInt(content.humidityAir),
      });
      setDataHumidityAir(dataHumidityAir.slice());
    });

    return () => {
      client.end();
    };
  }, []);

  // function tick() {
  //     temp = temp +1;
  //     setTemp(temp);
  //     a=a+1;
  // }

  const onChangeDemo = (checked) => {
    if (checked) {
      const client = mqtt.connect(`ws://iot.ithust.xyz:9001`);
      setDemoId(
        setInterval(() => {
          client.publish(
            "realtimeweb",
            JSON.stringify({
              humidityLand: Math.floor(Math.random() * 100),
              humidityAir: Math.floor(Math.random() * 100),
              temperature: Math.floor(Math.random() * 100),
            })
          );
        }, 2000)
      );
    } else {
      clearInterval(demoId);
      //client.end();
    }
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={8}>
          <div className="_center">
            <h3>Humidity Land</h3>
            <Progress type="circle" percent={humidityLand} />
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
            <Progress
              type="circle"
              format={(percent) => `${percent} *C`}
              percent={temperature}
            />
          </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={8} style={{ padding: "10px" }}>
          <Line {...config} data={dataHumidityLand} />
        </Col>
        <Col span={8} style={{ padding: "10px" }}>
          <Line {...config} data={dataHumidityAir} />
        </Col>
        <Col span={8} style={{ padding: "10px" }}>
          <Line {...config} data={dataTemperature} />
        </Col>
      </Row>
      <Row>
        <Switch
          defaultChecked={false}
          checkedChildren="On Demo"
          unCheckedChildren="Off Demo"
          onChange={onChangeDemo}
          disabled={!connectionStatus}
        />
      </Row>
    </div>
  );
}

RealTime.propTypes = {};

export default RealTime;
