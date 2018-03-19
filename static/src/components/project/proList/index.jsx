import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Row, Col, Button, Card } from 'antd';


class ProList extends React.Component {
    constructor(props) {
	   super(props);
    }
    gotoDetail(index) {
    	this.props.select(index)
    	this.props.checkout(3)
    }
    render() {
    	const listItems = this.props.data.map((project, index) =>
    	  <Col span={8} key={index}>
    	  	 <Card onClick={() => {
    	  	 	this.gotoDetail(index)
    	  	 }} title={project.project}>{project.projectInfo || '暂时没有'}</Card>
    	  </Col>
    	);
	    return (
	      <div className="prolist-wrapper">
	      	<Row>
	      	    <Col className="gutter-row" span={4}>
	      	        <div className="add" onClick={() => {
			      		this.props.checkout(2)
			      	}}>
			      		<Button type="primary">创建项目+</Button>
			      	</div>
	      	    </Col>
	      	    <Col className="gutter-row" span={18}>
	      	    	<Row gutter={16}>
	      	    		{listItems}
	      	    	</Row>
	      	    </Col>
	      	</Row>
	      </div>
	    )
    }
}

ProList.propTypes = {
    checkout: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
};
export default ProList