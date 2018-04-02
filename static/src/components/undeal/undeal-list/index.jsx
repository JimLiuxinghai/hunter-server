import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Button, Card, Table, Modal, Form, Input} from 'antd';
const FormItem = Form.Item;
import './index.less';
const createForm = Form.create;
import {addDeal, updateState} from '../../../api/undeal';

class dealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showModal(e) {
    this.setState({
      visible: true,
    });
    this.msg = e.msg;
    this.error_id = e.id;
  }

  handleOk() {
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.postPro(this.props.form.getFieldsValue());
  }

  async postPro(param) {
    param.key = this.msg;
    let resData = await addDeal(param);
    if (resData.status.code === 200) {
      let updateParam = {
        err_id: this.error_id,
        state: 2 // 未处理1， 已处理2
      };
      let updateData = await updateState(updateParam);
      if (updateData.status.code === 200) {
        console.log('8888888888');
        this.setState({
          visible: false,
        });
      }
    }
  }

  render() {
    const columns = this.props.columns;
    const data = this.props.data;
    const getFieldProps = this.props.form.getFieldProps;
    let msg, error_id;
    return (
      <div className="undealList-wrapper">
        <Row>

          <Table
            columns={columns}
            dataSource={data}
            bordered
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.showModal(record, index);
                  getFieldProps.key = record.msg;
                },
              };
            }}
          />

        </Row>

        <Modal title="查看详情" visible={this.state.visible} onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)} footer={[]}>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormItem>
              <p className="ant-form-text" id="userName" name="userName">{this.msg}</p>
            </FormItem>
            <FormItem
              id="control-input"
              label="处理人"
              labelCol={{span: 6}}
              wrapperCol={{span: 14}}>
              <Input id="control-input" placeholder="Please enter..." {...getFieldProps('user')}/>
            </FormItem>
            <FormItem
              id="control"
              label="处理原因"
              labelCol={{span: 6}}
              wrapperCol={{span: 14}}>
              <Input id="control" placeholder="Please enter..." {...getFieldProps('reason')}/>
            </FormItem>
            <FormItem wrapperCol={{span: 16, offset: 6}} style={{marginTop: 24}}>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}


dealList = createForm()(dealList);
export default dealList
