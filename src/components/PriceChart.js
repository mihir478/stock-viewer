import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class PriceChart extends PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="lightblue" activeDot={{ r: 8 }} />
      </LineChart>
    )
  }
}

PriceChart.propTypes = {
    data: PropTypes.array.isRequired    
}


export default PriceChart
