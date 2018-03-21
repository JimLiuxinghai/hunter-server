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
    this.props.switchTime('3', dateString)
   
  }
  onRadioChange(e){
     this.props.switchTime(e.target.value, [0, 1]);
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current > new Date()
  }
  render() {
    let type = this.props.selectType;
    return (
      <div className="type-wrapper">
        <Row>
          <RadioGroup defaultValue={type} size="middle" onChange={this.onRadioChange.bind(this)}>
            <RadioButton value="1">过去7天</RadioButton>
            <RadioButton value="2">过去14天</RadioButton>
            <RadioButton value="3">自定义</RadioButton>
          </RadioGroup>
          {
            type == 3 ? <span className="date-picker">
                <RangePicker disabledDate={this.disabledDate} format="YYYY-MM-DD" onChange={this.onTimeChange.bind(this)}/>
              </span> : null
          }
          

        </Row>
      </div>

    )
  }
}
screenBox.propTypes = {
  switchTime: PropTypes.func.isRequired
};


export default screenBox