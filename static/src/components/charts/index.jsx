import React from 'react'
import PropTypes from 'prop-types'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
import DataSet from '\@antv/data-set';
const data = [
    { year: '1997-07-05', sales: 38, key: 1 },
    { year: '1997-07-06', sales: 52, key: 2 },
    { year: '1997-07-07', sales: 61, key: 3 },
    { year: '1997-07-08', sales: 145, key: 4 },
    { year: '1997-07-09', sales: 48, key: 5 },
    { year: '1997-07-10', sales: 38, key: 6 },
    { year: '1997-07-11', sales: 38, key: 7 },
    { year: '1997-07-12', sales: 38, key: 8 },
];
// 定义度量
const cols = {
      'sales': {tickInterval: 20},
    };
const ds = new DataSet();
const dv = ds.createView().source(data);

class Charts extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount = () => {
		console.log(this.props, 'props')
	}
    render() {
	    return (
	    	<Chart height={400} data={data} scale={cols} forceFit>
	           <Axis name="year" />
	           <Axis name="sales" />
	           <Tooltip crosshairs={{type : "y"}}/>
	   
	           <Geom type="interval" position="year*sales" />
	           <Geom type="line" position="key*sales" size={2} />
	           <Geom type='point' position="key*sales" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
	        </Chart>
	    )
    }
}
Charts.propTypes = {
    type: PropTypes.string,
    data: PropTypes.array
};

export default Charts