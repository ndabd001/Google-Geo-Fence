import { Chart } from 'react-google-charts';
import React from 'react';
import data from './data';
import _ from 'lodash';

let arraydata = [];


let newdata = _.mapValues(data,function(o){o["propulsion.port.revolutions"]});

Object.keys(newdata).forEach(function(key){
  arraydata.push(new Array(key));
});

for(let i in arraydata){
 
    for(let key in data[i]){
     for(let key2 in data[i][key]){
        arraydata.push(data[i][key][key2])
     }
    }
  
}

//arraydata.push([Object.keys(newdata)]);

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: 'Date', minValue: 0, maxValue: 15 },
        vAxis: { title: 'RPM', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      data: [
        ['Date', 'Value','value2'],
        ["2018-05-04" , 12,13],
        [4, 5.5,5],
        [11,7,5],
        [4, 5,7],
        [3, 3.5,3],
        [6.5, 7,5],
      ],
    };
  }
  render() {
    return (
      <div>
        <div>{JSON.stringify(arraydata)}</div>
      </div>
      // <Chart
        // chartType="LineChart"
        // data={this.state.data}
        // options={this.state.options}
        // graph_id="ScatterChart"
        // width="100%"
        // height="400px"
        // legend_toggle
      ///>
    );
  }
}
export default ExampleChart;