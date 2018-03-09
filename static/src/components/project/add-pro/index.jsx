import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import Type from './type'
import { Row, Col, Button, Input  } from 'antd';



class Addpro extends React.Component {
    constructor(props) {
	   super(props);
	   this.state = {
	   		type: '',
	   		name: ''
	   }
    }
    switchType = (type) => {
    	this.setState({
    		type: type
    	})
    }
    changeName (e) {
        let value = e.target.value
        this.setState({
            name: value
        })
    }
    async sure () {
    	if(this.state.name == '') {
            alert('请输入项目名称')
    	}
    	else if(this.state.type == '') {
            alert('请选择技术类型')
    	}
    	else {
    		let param = {
    		    project: this.state.name	
    		}
            let data = await this.props.repeat(param)
            if(data.status.code == 200) {
                let addData = await this.props.post(param)
                console.log(addData)
                
            }
    	}
    }
    render() {
	    return (
	        <div className="add-wrapper">
	        	<div className="title">项目名称:</div>
	      		<Input placeholder="项目名称" className="input"  onInput ={this.changeName.bind(this)}/>
	      		<div className="title">项目类型:</div>
	      		<Type switchType={this.switchType}/>
	      		<Button type="primary" onClick={this.sure.bind(this)}>生成代码</Button>
	        </div>
	    )
    }
}

Addpro.propTypes = {
    post: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired
};
export default Addpro