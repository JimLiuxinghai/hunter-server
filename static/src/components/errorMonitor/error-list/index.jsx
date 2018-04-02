import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Card, Table, Modal } from 'antd';
import './index.less'

class errorList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const columns = this.props.columns;
    const data = this.props.data;

    return (
      <div className="errorList-wrapper">
        <div className="title">
          <span>异常内容</span>
        </div>
        <Row>
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 2000 }}
                bordered
              />
        </Row>
      </div>
    )
  }
}


export default errorList
