import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Card, Table  } from 'antd';
import './index.less'

class dealList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const columns = this.props.columns;
    const data = this.props.data;
    console.log(columns);
    console.log(data);
    return (
      <div className="undealList-wrapper">
        <Row>
            <Card
              type="inner"
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


export default dealList
