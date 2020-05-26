import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import palette from '../theme/palette';
import { options } from '../components/PriceChart';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Timeseries = props => {
  const { className, data, interval, ...rest } = props;

  const classes = useStyles();

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Close Price',
        lineTension: 0, // sharp lines
        borderColor: palette.primary.main, // color for line only
        backgroundColor: fade(palette.primary.main, 0.5), // color for background fill below the line
        pointBackgroundColor: palette.primary.main, // color for points
        pointRadius: 5, // point size
        data: data.map(d => d.close)
      }
    ]
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
           <FormControl className={classes.formControl}>
            <InputLabel>Relative Period</InputLabel>
            <Select
              value={interval}
            >
              <MenuItem value="1m">Last 1 Month</MenuItem>
              <MenuItem value="3m">Last 3 Months</MenuItem>
              <MenuItem value="6m">Last 6 Months</MenuItem>
              <MenuItem value="1y">Last 1 Year</MenuItem>
              <MenuItem value="2y">Last 2 Years</MenuItem>
              <MenuItem value="5y">Last 5 Years</MenuItem>
            </Select>
      </FormControl>
        }
        title="Historical Performance"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Line
            data={chartData}
            options={options}
          />
        </div>
      </CardContent>      
    </Card>
  );
};

Timeseries.propTypes = {
  className: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  interval: PropTypes.string.isRequired
};

export default Timeseries;