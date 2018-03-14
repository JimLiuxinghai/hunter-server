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
    	const operations = <Button>返回</Button>;
	    return (
	        <div className="pro-manage">
	      		<Tabs tabBarExtraContent={operations}>
		      	    <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
		      	    <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
		      	    <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
	      	  	</Tabs>
	        </div>
	    )
    }
}

ProManage.propTypes = {
    checkout: PropTypes.func.isRequired,
    // data: PropTypes.array.isRequired
};
export default ProManage