import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/layout/style/css'
import {Layout, Menu, Breadcrumb} from 'antd'

import '../common/common.less'
import ErrorList from '../components/errorMonitor/error-list'
import ErrorCharts from '../components/errorMonitor/error-chart'
import {errorList, errorByTime} from  '../api/errorMonitor'
import timeUtils  from './../utils/datetime'
import DataSet from '\@antv/data-set';
import radioButton from "../components/errorMonitor/radio-button/index";

class App extends React.Component {
  state = {
    errorList: [],
    errorDataChart: []
  };

  async getErrorByTime(param) {
    let resData = await errorByTime();
    let chartData = resData.data;

    chartData.map((item) => {
      let date = new Date(item.createTime);
      item.createTime = timeUtils.format(date, 'hh:mm:ss');
      return item;
    });
    this.setState({
      errorDataChart: chartData
    });
  }
  async getErrorList(param){
    let errorListData = await errorList();
    this.setState({
      errorList: errorListData.data.data
    })
  }

  async componentDidMount() {

    await this.getErrorByTime();
    await this.getErrorList();
    let timer = setInterval(async () => {
      await this.getErrorByTime();
      await this.getErrorList();
    }, 10000);
  }

  render() {
    const columns = [{
      title: '错误详情',
      dataIndex: 'msg',
      className: 'column-detail',
    }, {
      title: '页面地址',
      dataIndex: 'targetUrl'
    }, {
      title: '错误级别',
      dataIndex: 'level'
    }, {
      title: '错误状态',
      dataIndex: 'dealState'
    }, {
      title: '时间',
      dataIndex: 'createTime'
    }, {
      title: 'UA',
      dataIndex: 'ua',
      className: 'column-ua'
    }];
// 定义度量
    const cols = {
      'createTime': {tickInterval: 20},
    };
    return (
      <Layout>
        {/*面包屑导航*/}
        <Breadcrumb style={{margin: '12px'}}>
          <Breadcrumb.Item>实时监控</Breadcrumb.Item>
        </Breadcrumb>
        <ErrorCharts data={this.state.errorDataChart} cols={cols}/>
        <ErrorList columns={columns} data={this.state.errorList}/>
      </Layout>
    )
  }
}


export default App