import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import 'antd/lib/layout/style/css'
import '../common/common.less'


class App extends React.Component {
	render() {
		return (
			<Layout>
				{/*面包屑导航*/}
				<Breadcrumb style={{ margin: '12px' }}>
				  <Breadcrumb.Item>项目管理</Breadcrumb.Item>
				</Breadcrumb>
				
			</Layout>
		)
	}
}


export default App