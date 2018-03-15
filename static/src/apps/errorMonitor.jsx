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

  async getErrorByTime(param, formatStr) {
    let resData = await errorByTime(param);
    let chartData = resData.data;

    chartData.map((item) => {
      let date = new Date(item.createTime);
      item.createTime = timeUtils.format(date, formatStr);
      return item;
    });
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

  switchDate = (date, type) => {
    let dateStr = '';
    switch (type) {
      case "1":
        dateStr = timeUtils.switch(date, 0.042);
        break;
      case "2":
        dateStr = timeUtils.switch(date, 1);
        break;
      case "3":
        dateStr = timeUtils.switch(date, 7);
        break;
    }
    return dateStr;
  };
  async getError(){
    let nowTime = timeUtils.getNowDatetime(),
      type = this.state.stateType,
      formatStr = type == 3 ? 'yyyy-mm-dd hh:MM:ss' : 'hh:mm:ss',
      config = {
        startTime: this.switchDate(nowTime, type),
        endTime: nowTime,
        timeType: type == 3 ? 2 : 1,
      };
    console.log(this.state.stateType);
    await this.getErrorByTime(config, formatStr);
    await this.getErrorList(config);
  };
  async componentDidMount() {
    this.getError();
    let timer = setInterval(async () => {
      this.getError();
    }, 10000000);
  }

  timeType = (newType) => {
    this.setState({
      stateType: newType
    },()=>{
      this.getError();
    });

  };

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
        <ScreenBox timeType={this.timeType} selectType={this.state.stateType}></ScreenBox>
        <ErrorCharts data={this.state.errorDataChart} cols={cols}/>
        <ErrorList columns={columns} data={this.state.errorList}/>
      </Layout>
    )
  }
}


export default App