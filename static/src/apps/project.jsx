import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { xonokai } from 'react-syntax-highlighter/styles/prism'
import { prolist, addProApi, isRepeat } from '../api/project.js'
import ProList from '../components/project/pro-list'
import AddPro from '../components/project/add-pro/index.jsx'
import 'antd/lib/layout/style/css'
import '../common/common.less'


class App extends React.Component {
	state = {
		proStatus: 2,   //1:项目列表 2:新增项目 3:项目管理
		proList: []
	}
	checkStatus = (type) => {
		this.setState({
			proStatus: type
		})
	}
	async componentDidMount () {
		let prolistData = await prolist()

		this.setState({
			proList: prolistData.data
		})
	}
 	async postPro (param) {
 		let resData = await addProApi(param)
 		console.log(resData)
 	}
 	async repeat (param) {
 		let resData = await isRepeat(param)
 		console.log(resData)
 		return resData
 	} 
	render() {	
		let showPage = null
		if(this.state.proStatus == 1) {
			showPage = <ProList checkout={this.checkStatus} data={this.state.proList} />
		}
		else if (this.state.proStatus == 2) {
			showPage = <AddPro checkout={this.checkStatus} post={this.postPro} repeat={this.repeat} />
		}
		else if (this.state.proStatus == 3) {
			showPage = null
		}
		return (
			<Layout>
				{/*面包屑导航*/}
				<Breadcrumb style={{ margin: '12px' }}>
				  <Breadcrumb.Item>项目管理</Breadcrumb.Item>
				</Breadcrumb>
				{ showPage }
			</Layout>
		)
	}
}


export default App