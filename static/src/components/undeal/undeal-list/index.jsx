import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Card, Table, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
import './index.less';
const createForm = Form.create;
import { addDeal, updateState, errDetail } from '../../../api/undeal';

class dealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            user: '',
            reason: ''
        }
    }

    showModal(e) {
        this.setState({
            visible: true,
            user: '',
            reason: ''
        });
        this.getErrDetail(e.msg)
        this.reason = '';
        this.user = '';
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
        let param = {
            user: this.state.user,
            reason: this.state.reason,
        };
        this.postPro(param);
    }

    changeUser(e) {
        let value = e.target.value;
        this.setState({
            user: value
        })
    }

    changeReason(e) {
        let value = e.target.value;
        this.setState({
            reason: value
        })
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
                this.setState({
                    visible: false,
                    user: '',
                    reason: ''
                });
                this.props.fatherHandleClick(true)
            }
        }
    }
    async getErrDetail(msg) {
        let param = { msg }
        let resData = await errDetail(param);
        console.log(resData)
    }

    render() {
        const columns = this.props.columns;
        const data = this.props.data;
        let msg, error_id;
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
                            onRow={(record, index) => {
                                return {
                                    onClick: () => {
                                        this.showModal(record, index);
                                    },
                                };
                            }}
                        />
                    </Card>
                </Row>

                <Modal title="查看详情" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} footer={[]}>
                    <div className="showInput">
                        <p className="ant-form-text" id="userName" name="userName" >{this.msg}</p>
                        <Input placeholder="处理人" className="input" onInput={this.changeUser.bind(this)} />
                        <Input placeholder="处理原因" className="input" onInput={this.changeReason.bind(this)} />
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}


dealList = createForm()(dealList);
export default dealList
