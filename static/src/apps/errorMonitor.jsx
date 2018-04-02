import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/layout/style/css'
import {Layout, Menu, Breadcrumb} from 'antd'

import '../common/common.less'
import ErrorList from '../components/errorMonitor/error-list'
import ErrorCharts from '../components/errorMonitor/error-chart'
import ScreenBox from '../components/errorMonitor/screen-box'
import {errorList, errorByTime} from  '../api/errorMonitor'
import timeUtils  from './../utils/datetime'

class App extends React.Component {
  state = {
    errorList: [],
    errorDataChart: [],
    stateType: "1"
  };

  async getErrorByTime(param) {
    let resData = await errorByTime(param);
    let chartData = resData.data;
    this.setState({
      errorDataChart: chartData
    });
  }

  async getErrorList(param) {
    let errorListData = await errorList(param);
    this.setState({
      errorList: errorListData.data.data
    })
  }

  async getError() {
    let min = this.state.stateType == 1 ? 5 : 10;

    let nowTime = timeUtils.getNowDatetime(),
      startTime = timeUtils.cutMin(nowTime, 1, min)[0],
      config = {
        startTime: startTime,
        endTime: nowTime,
        timeType: this.state.stateType
      };
    console.log(111111)
    await this.getErrorByTime(config);
    await this.getErrorList(config);
  }

  async componentDidMount() {
    this.getError();
    this.interval();
  }

  interval() {
    clearInterval(timer)
    let time = this.state.stateType == 1 ? 1000 * 5 * 60 : 1000 * 10 * 60
    let timer = setInterval(async () => {
      this.getError();
    }, time)
  }

  timeType = (newType) => {
    this.setState({
      stateType: newType
    }, async () => {
      await this.getError();
      this.interval();
    });

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
      'time': {tickInterval: 20},
    };
    return (
      <Layout>
        {/*面包屑导航*/}
        <Breadcrumb>
          <Breadcrumb.Item>实时监控</Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-content">
          <ScreenBox timeType={this.timeType} selectType={this.state.stateType}></ScreenBox>
          <ErrorCharts data={this.state.errorDataChart} cols={cols}/>
          <ErrorList columns={columns} data={this.state.errorList}/>
        </div>
      </Layout>
    )
  }
}


export default App