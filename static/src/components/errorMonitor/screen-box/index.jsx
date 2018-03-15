import React from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { Row, Col, Button, Radio, DatePicker  } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

class screenBox extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.selectType == this.props.selectType)
  }
  onTimeChange(value, dateString){
    console.log('From: ', dateString[0], ', to: ', dateString[1]);
  }
  onRadioChange(e){
    this.props.timeType(e.target.value);
  }
 
  render() {
    let type = this.props.selectType;
    return (
      <div className="type-wrapper">
        <Row>
          <RadioGroup defaultValue={type} size="middle" onChange={this.onRadioChange.bind(this)}>
            <RadioButton value="1">最近1小时</RadioButton>
            <RadioButton value="2">今天</RadioButton>
            <RadioButton value="3">7天</RadioButton>
          </RadioGroup>
          <span className="date-picker">
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.onTimeChange}/>
          </span>

        </Row>
      </div>

    )
  }
}
screenBox.propTypes = {
  timeType: PropTypes.func.isRequired,
  selectType: PropTypes.string.isRequired
};


export default screenBox