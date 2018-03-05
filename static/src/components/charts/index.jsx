import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts'
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

class Charts extends React.Component {
	state = {
	    showList: true,
	}
	toggle = () => {
		this.setState({
		    showList: !this.state.showList,
		})
	}
    render() {
    	
	    return (
	    	<Chart height={400} data={data} scale={cols} forceFit>
	           <Axis name="year" />
	           <Axis name="sales" />
	           <Tooltip crosshairs={{type : "y"}}/>
	           <Geom type="line" position="year*value" size={2} />
	           <Geom type="interval" position="year*sales" />
	        </Chart>
	    )
    }
}


export default Charts