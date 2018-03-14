import React from 'react'
import PropTypes from 'prop-types'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
import { Row, Col, Button, Card, Table,Radio  } from 'antd';
import './index.less'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class radioButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="type-wrapper">
        <Row>
          <RadioGroup defaultValue="a" size="middle" className="timeType">
            <RadioButton value="1">最近1小时</RadioButton>
            <RadioButton value="2">今日累计</RadioButton>
          </RadioGroup>
        </Row>
      </div>

    )
  }
}


export default radioButton