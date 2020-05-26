import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import palette from '../theme/palette'
import { options } from '../components/PriceChart'
import CumulativeReturn from '../components/CumulativeReturn'
import SummaryCard from '../components/SummaryCard'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  chartContainer: {
    height: 300,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const Timeseries = props => {
  const { className, data, interval, onIntervalChange, ...rest } = props

  const classes = useStyles()
  const closePrices = data.map(d => d.close)

  const lineChartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Close Price',
        lineTension: 0, // sharp lines
        borderColor: palette.primary.main, // color for line only
        backgroundColor: fade(palette.primary.main, 0.5), // color for background fill below the line
        pointBackgroundColor: palette.primary.main, // color for points
        pointRadius: 0,
        data: closePrices
      }
    ]
  }

  const intervalMin = Math.min(...closePrices)
  const intervalMax = Math.max(...closePrices)
  const intervalMean = Number(closePrices.reduce((acc, value) => (acc + value)) / closePrices.length).toFixed(2)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
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
                    onChange={event => onIntervalChange(event.target.value)}
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
                  data={lineChartData}
                  options={options}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <CumulativeReturn data={data} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard value={intervalMax} label="Interval High" />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard value={intervalMin} label="Interval Low" />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard value={intervalMean} label="Interval Average" />
        </Grid>
      </Grid>
    </div>
  )
}

Timeseries.propTypes = {
  className: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  interval: PropTypes.string.isRequired,
  onIntervalChange: PropTypes.func.isRequired
}

export default Timeseries
