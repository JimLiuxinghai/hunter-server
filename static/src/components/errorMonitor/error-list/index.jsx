import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Card, Table  } from 'antd';
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
        <Row>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="异常内容"
            >
              <Table
                columns={columns}
                dataSource={data}
                bordered
              />
            </Card>
        </Row>
      </div>
    )
  }
}


export default errorList
