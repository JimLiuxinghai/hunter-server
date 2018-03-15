import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Row, Col, Button, Tabs } from 'antd';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

class ProManage extends React.Component {
    constructor(props) {
	   super(props);
    }
    render() {
    	let proItem = this.props.proItem
    	const operations = <Button onClick={() => {
    		this.props.checkout(1)
    	}}>返回</Button>;
    	let userList = null
    	
    	if(this.props.proUser) {
    		userList = this.props.proUser.map((user, index) =>
    			<div className="list-item" key={index}>
    				<div className="name">{user.username}</div>
    				<div className="mail">{user.email}</div>
    			</div>
    		);
    	}
    	
	    return (
	        <div className="pro-manage">
	      		<Tabs tabBarExtraContent={operations}>
		      	    <TabPane tab="基本信息" key="1">
		      	    	{
		      	    		proItem ? <div className="info">
					      	    		<div className="title">项目名称</div>
					      	    		<div className="inner">{ proItem.project }</div>
					      	    		<div className="title">框架类型</div>
					      	    		<div className="inner">{ proItem.projectType }</div>
					      	    		<div className="title">项目Id</div>
					      	    		<div className="inner">{ proItem.projectId }</div>
					      	    		<div className="title">项目简介</div>
					      	    		<div className="inner">{ proItem.projectInfo }</div>
					      	    	</div> : null
		      	    	}
		      	    	
		      	    </TabPane>
		      	    <TabPane tab="成员列表" key="2">
		      	    	<div className="user-info">
		      	    		{userList}
		      	    	</div>
		      	    </TabPane>
	      	  	</Tabs>
	        </div>
	    )
    }
}

ProManage.propTypes = {
    checkout: PropTypes.func.isRequired,
    proItem: PropTypes.object,
    proUser: PropTypes.array,
};
export default ProManage