import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import 'antd/lib/layout/style/css'
import '../common/common.less'
import Charts from './../components/charts/index.jsx'


class App extends React.Component {
	render() {
		return (
			<h1>项目管理</h1>
		)
	}
}


export default App