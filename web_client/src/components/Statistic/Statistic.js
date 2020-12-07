import React from "react";
import PropTypes from "prop-types";
import { Row, Col, ConfigProvider, DatePicker, Space } from "antd";
import { useState } from "react";
import statisticApi from "../../api/statisticApi";

import moment from "moment";
import "moment/locale/vi";
import locale from "antd/lib/locale/vi_VN";
import { Line } from "react-chartjs-2";

const { RangePicker } = DatePicker;

function Statistic(props) {
  const [value, setValue] = useState([]);

  const handleSuccess = (res) => {
    console.log(res);
  };

  async function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    let res = await statisticApi.sensor(value[0].valueOf(), value[1].valueOf());
    setValue(res);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  const data = {
    labels: value.map((item, index) =>
      moment(item.time).format("DD-MM-YYYY HH:mm:ss")
    ),
    datasets: [
      {
        label: "Humudity Land",
        fill: false,
        // lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value.map((item) => item.humidityLand),
      },
      {
        label: "Humudity Air",
        fill: false,
        // lineTension: 0.1,
        backgroundColor: "rgba(25,92,92,0.4)",
        borderColor: "rgba(25,92,92,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(25,92,92,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(25,92,92,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value.map((item) => item.humidityAir),
      },
      {
        label: "Temperature",
        fill: false,
        // lineTension: 0.1,
        backgroundColor: "rgba(65,142,42,0.4)",
        borderColor: "rgba(65,142,42,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(65,142,42,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(65,142,42,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value.map((item) => item.temperature),
      },
    ],
  };

  return (
    <div>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <ConfigProvider locale={locale}>
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="DD-MM-YYYY HH:mm:ss"
              onChange={onChange}
              onOk={onOk}
              ranges={{
                "Hôm nay": [moment().startOf("day"), moment().endOf("day")],
                "Hôm qua": [
                  moment().startOf("day").subtract(1, "day"),
                  moment().endOf("day").subtract(1, "day"),
                ],
                "Tháng này": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
                "Tháng trước": [
                  moment().startOf("month").subtract(1, "month"),
                  moment().endOf("month").subtract(1, "month"),
                ],
              }}
            />
          </ConfigProvider>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Line
            data={data}
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: false,
            // }}
          />
        </Col>
      </Row>
    </div>
  );
}

Statistic.propTypes = {};

export default Statistic;
