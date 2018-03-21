import React from 'react'
import './index.less'
import ProList from '../proList/index.jsx'

class Header extends React.Component {
	state = {
	    showList: true,
	}
	toggle = () => {
		this.setState({
		    showList: !this.state.showList,
		})
	}
    render() {
    	let list = !!this.state.showList ? <ProList /> : null
	    return (
	    	<header>
	    		<div className="list-wrapper">
	    			<div className="show-product">项目名称</div>
	    			{list}
	    		</div>
	    	</header>
	    )
    }
}


export default Header