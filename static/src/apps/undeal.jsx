import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/layout/style/css'
import {Layout, Menu, Breadcrumb} from 'antd'

import '../common/common.less'
import DealList from '../components/undeal/undeal-list'
import {unDeal} from  '../api/undeal'


class App extends React.Component {
  state = {
    dealList: []
  };

  async componentDidMount() {
    let dealListData = await unDeal();

    this.setState({
      dealList: dealListData.data
    })
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

    return (
      <Layout>
        {/*面包屑导航*/}
        <Breadcrumb style={{margin: '12px'}}>
          <Breadcrumb.Item>未处理页面</Breadcrumb.Item>
        </Breadcrumb>
        <DealList columns={columns} data={this.state.dealList}/>
      </Layout>
    )
  }
}


export default App