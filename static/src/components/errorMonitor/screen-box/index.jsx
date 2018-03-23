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

  onRadioChange(e){
    this.props.timeType(e.target.value);
  }
 
  render() {
    let type = this.props.selectType;

    return (
      <div className="type-wrapper">
        <Row>
          <RadioGroup defaultValue={type} size="middle" onChange={this.onRadioChange.bind(this)}>
            <RadioButton value="1">30分钟</RadioButton>
            <RadioButton value="2">1小时</RadioButton>
          </RadioGroup>
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