import React from 'react'


class radioButton extends React.Component {
  render() {
    return (
      <div className="pro-list">
        项目列表
      </div>
    )
  }
}


export default ProList

import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

ReactDOM.render(
  <div>
    <div style={{ marginTop: 16 }}>
      <RadioGroup defaultValue="a" size="small">
        <RadioButton value="a">Hangzhou</RadioButton>
        <RadioButton value="b">Shanghai</RadioButton>
        <RadioButton value="c">Beijing</RadioButton>
        <RadioButton value="d">Chengdu</RadioButton>
      </RadioGroup>
    </div>
  </div>
  , mountNode);