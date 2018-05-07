import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
import DataSet from '\@antv/data-set';

class Charts extends React.Component {
	state = {
	    showList: true,
	}
	
    render() {
    	let data = this.props.timeData
   		console.log(data)
   		const cols = {
	        'time': {tickInterval: 5},
	    };
	    return (
	    	<div className="chart">
	    		<div className="info-wrapper">
	    			<div className="info">
              			<span className="point"></span>
	    				<span className="title">影响用户：</span>
	    				<span className="num">{this.props.user}</span>
	    			</div>
	    			<div className="info">
              			<span className="point"></span>
	    				<span className="title">影响页面：</span>
	    				<span className="num">{this.props.pages}</span>
	    			</div>
	    			<div className="info">
              			<span className="point"></span>
	    				<span className="title">影响项目：</span>
	    				<span className="num">{this.props.project}</span>
	    			</div>
	    		</div>
    			<Chart height={400} data={data} forceFit>
    		       <Axis name="time" />
    		       <Axis name="count" />
    		       <Tooltip crosshairs={{type : "y"}}/>
    		       <Geom type="interval" position="time*count"  size='20' />
    		       <Geom type="line" position="time*count" size={2} />
    		       <Geom type='point' position="time*count" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
    		    </Chart>
	    	</div>
	    )
    }
}


export default Charts