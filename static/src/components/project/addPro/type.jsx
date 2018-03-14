import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Icon } from 'antd';

const typeData = [
	{
		name: 'Js',
		type: 'apple'
	},
	{
		name: 'React',
		type: 'facebook'
	},
	{
		name: 'Angular',
		type: 'google'
	},
	{
		name: 'Vue',
		type: 'taobao'
	}
]
class Type extends React.Component {
    constructor(props) {
	   super(props);
       this.state = {
          type: ''
       }
    }
    chooseType(type) {
        this.setState({
            type: type
        })
        this.props.switchType(type)
    }
    render() {
        let _self = this;
    	const iconList = typeData.map((item, index) =>
    		<li className={_self.state.type == item.name ? 'icon-wrapper active' : 'icon-wrapper'} key={index} onClick={() => {
                this.chooseType(item.name)
            }}>
    			<Icon type={item.type} key={index} className="icon" />
                <div className="text">{item.name}</div>
    		</li>
    	);
	    return (
	        <div className="add-wrapper">
	        	<ul className="iconList">
	        		{iconList}
	        	</ul>
	        </div>
	    )
    }
}

Type.propTypes = {
    switchType: PropTypes.func.isRequired,
};
export default Type