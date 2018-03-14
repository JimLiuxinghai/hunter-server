import React from 'react'
import PropTypes from 'prop-types'
import RadioButton from '../radio-button'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
import { Row, Col, Button, Card, Table  } from 'antd';
import './index.less'
class errorCharts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dv = this.props.data;
    const cols = this.props.cols;
    return (
    <div className="errorChart-wrapper">
      <Row>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="实时监控"
        >
          <RadioButton></RadioButton>
          <Chart height={400} data={dv} scale={cols} forceFit>
            <Axis name="createTime" />
            <Axis name="count" />
            <Tooltip crosshairs={{type : "y"}}/>

            <Geom type="interval" position="createTime*count" />
          </Chart>
        </Card>
      </Row>
    </div>

    )
  }
}


export default errorCharts