import React from 'react'
import './index.less'
import ProList from '../proList/index.jsx'

class Header extends React.Component {
	state = {
	    showList: false,
	}
	toggle = () => {
		this.setState({
		    showList: !this.state.showList,
		})
	}
    render() {
	    return (
	    	<header>
	    		<div className="list-wrapper">
	    			<div className=""></div>
	    		</div>
	    	</header>
	    )
    }
}


export default Header