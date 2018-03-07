import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content } = Layout

class Work extends React.Component {
  state = {
    collapsed: false,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
        <h1>work页面</h1>
    )
  }
}


export default Work