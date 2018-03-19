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

    console.log(dealListData);
    this.setState({
      dealList: dealListData.data
    })
  }

  render() {
    const columns = [{
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '错误原因',
      dataIndex: 'reason'
    }, {
      title: '处理人',
      dataIndex: 'user'
    }, {
      title: '更新时间',
      dataIndex: 'updatetime'
    }
    ];
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