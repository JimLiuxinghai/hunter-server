import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import Type from './type'
import { Row, Col, Button, Input  } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import typeData from './assest/type.json'

class Addpro extends React.Component {
    constructor(props) {
	   super(props);
	   this.state = {
	   		type: 'Js',
	   		name: '',
            status: 0, //0:未添加; 1:已添加 展示代码,
            projectId: ''
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
                param.projectType = this.state.type
                param.projectInfo = '项目信息'
                let addData = await this.props.post(param)
                
                if(addData.status.code == 200) {
                    this.setState({
                        status: 1
                    })
                }
            }
    	}
    }
    render() {
        
        let code = decodeURIComponent(typeData[this.state.type].code)
        
	    return (
	        <div className="add-wrapper">
	        	<div className="title">项目名称:</div>
	      		<Input placeholder="项目名称" className="input"  onInput ={this.changeName.bind(this)}/>
	      		<div className="title">项目类型:</div>
                {
                    this.state.status == 0 ? <Type switchType={this.switchType} type={this.state.type}/>: null
                }
	      		
                {
                    this.state.status == 0 ? <Button type="primary" onClick={this.sure.bind(this)}>生成代码</Button> : <div className="result">
                        <SyntaxHighlighter language='javascript' style={xonokai}>
                         {code}
                        </SyntaxHighlighter>
                    </div>
                }
	        </div>
	    )
    }
}

Addpro.propTypes = {
    post: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired
};
export default Addpro