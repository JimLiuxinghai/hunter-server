import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Row, Col, Button, Input  } from 'antd';


class Addpro extends React.Component {
    constructor(props) {
	   super(props);
	   this.state = {
	   		type: ''
	   }
    }
    render() {
	    return (
	        <div className="add-wrapper">
	        	<div className="title">项目名称</div>
	      		<Input placeholder="Basic usage" />
	        </div>
	    )
    }
}

Addpro.propTypes = {
    
};
export default Addpro