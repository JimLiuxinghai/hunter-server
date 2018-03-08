import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/layout/style/css'
import {Layout, Menu, Breadcrumb} from 'antd'

import '../common/common.less'
import ErrorList from '../components/errorMonitor/errot-list'
import {errorList} from  '../api/errorMonitor'


class App extends React.Component {
  state = {
    errorList: []
  };

  async componentDidMount() {
    let errorListData = await errorList();
    this.setState({
      errorList: errorListData.data.data
    })
  }

  render() {
    const columns = [{
      title: '错误详情',
      dataIndex: 'msg',
    }, {
      title: '页面链接',
      dataIndex: 'targetUrl'
    }, {
      title: '错误级别',
      dataIndex: 'level'
    }, {
      title: '错误状态',
      dataIndex: 'dealState'
    },
      {
        title: '时间',
        dataIndex: 'createTime'
      }
    ];
    return (
      <Layout>
        {/*面包屑导航*/}
        <Breadcrumb style={{margin: '12px'}}>
          <Breadcrumb.Item>实时监控</Breadcrumb.Item>
        </Breadcrumb>
        <ErrorList columns={columns} data={this.state.errorList}/>
      </Layout>
    )
  }
}


export default App