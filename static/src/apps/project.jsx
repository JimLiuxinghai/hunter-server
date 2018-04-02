import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { xonokai } from 'react-syntax-highlighter/styles/prism'
import { prolist, addProApi, isRepeat, proUser } from '../api/project.js'
import ProList from '../components/project/proList/index.jsx'
import AddPro from '../components/project/addPro/index.jsx'
import ProManage from '../components/project/proManage/index.jsx'
import 'antd/lib/layout/style/css'
import '../common/common.less'


class App extends React.Component {
	state = {
		proStatus: 1,   //1:项目列表 2:新增项目 3:项目管理
		proList: [],
		index: 0,
		proUser: []
	}
	checkStatus = (type) => {
		if(this.state.proStatus == 2) {

		}
		this.setState({
			proStatus: type
		})
	}
	async componentDidMount () {
		let prolistData = await prolist()
		let param = {
			projectId: prolistData.data[this.state.index].projectId
		}
		await this.getUser(param)
		this.setState({
			proList: prolistData.data
		})
	}
 	async postPro (param) {
 		let resData = await addProApi(param)
 		return resData
 	}
 	async repeat (param) {
 		let resData = await isRepeat(param)

 		return resData
 	}
 	async getUser (param) {
 		let resData = await proUser(param)
 		this.setState({
 			proUser: resData.data
 		})
 	}
 	async select (index) {
 		this.setState({
 			index: index
 		})
 		let param = {
 			projectId: this.state.proList[index].projectId
 		}
 		await this.getUser(param)
 	} 
	render() {	
		let showPage = null
		if(this.state.proStatus == 1) {
			showPage = <ProList select={this.select.bind(this)} checkout={this.checkStatus} data={this.state.proList} />
		}
		else if (this.state.proStatus == 2) {
			showPage = <AddPro checkout={this.checkStatus} post={this.postPro} repeat={this.repeat} />
		}
		else if (this.state.proStatus == 3) {
			showPage = <ProManage select={this.select} checkout={this.checkStatus} proUser={this.state.proUser} proItem={this.state.proList[this.state.index]} getUser={this.getUser}/>
		}
		return (
			<Layout>
				{/*面包屑导航*/}
				<Breadcrumb>
				  <Breadcrumb.Item>项目管理</Breadcrumb.Item>
				</Breadcrumb>
        <div className="main-content">
				{ showPage }
        </div>
			</Layout>
		)
	}
}


export default App