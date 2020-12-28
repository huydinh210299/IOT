import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Space, Button } from "antd";
import { useHistory } from "react-router-dom";

function ChooseArea(props) {
  const [areas, setareas] = useState([]);
  useEffect(() => {
    let area = [];
    for (let index = 1; index <= 20; index++) {
      area.push({
        areaName: `Area ${index}`,
      });
    }
    setareas(area);
  }, []);

  const history = useHistory();

  return (
    <Space style={{ display: "flex", flexWrap: "wrap" }} size="large" wrap>
      {areas.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Button
          onClick={() => {
            history.push("/statistic");
          }}
          style={{ width: "100px" }}
          key={index}
          style={{ margin: " 16px,8px", marginBottom: "10px" }}
        >
          <div style={{ width: "120px" }}>{item.areaName}</div>
        </Button>
      ))}
    </Space>
  );
}

ChooseArea.propTypes = {};

export default ChooseArea;
