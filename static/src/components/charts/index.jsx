import React from 'react'
import PropTypes from 'prop-types'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
import DataSet from '\@antv/data-set';
const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
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
	    	<Chart height={400} data={dv} scale={cols} forceFit>
	           <Axis name="year" />
	           <Axis name="sales" />
	           <Tooltip crosshairs={{type : "y"}}/>
	   
	           <Geom type="interval" position="year*sales" />
	           <Geom type="line" position="year*sales" size={2} />
	           <Geom type='point' position="year*sales" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
	        </Chart>
	    )
    }
}
Charts.propTypes = {
    type: PropTypes.string,
    data: PropTypes.array
};

export default Charts