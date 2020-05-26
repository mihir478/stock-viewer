import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CircularProgress, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Summary from './Summary'
import Timeseries from './Timeseries'
import actions from '../actions'
import { fetchSummaryStats, fetchTimeseries } from '../actions'

const styles = () => ({
  root: {
    display: 'flex'
  },
  chartContainer: {
    height: 400,
    position: 'relative'
  },
})

class ConditionalRenderer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { fetchSummaryStats, fetchTimeseries, ticker, interval } = this.props
    if (ticker) {
      fetchSummaryStats(ticker)
      if (interval) {
        fetchTimeseries(ticker, interval)
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchSummaryStats, fetchTimeseries, ticker, interval } = this.props
    if (ticker && ticker !== prevProps.ticker) {
      fetchSummaryStats(ticker)
      fetchTimeseries(ticker, interval)
    }
    else if (interval && interval !== prevProps.interval) {
      fetchTimeseries(ticker, interval)
    }
  }

  render() {
    const classes = styles()
    const {
      ticker, interval, editInterval,
      summaryJson, summaryStatus, summaryIsFetching,
      timeseriesJson, timeseriesStatus, timeseriesIsFetching 
    } = this.props
    
    const isSummaryError = summaryStatus >= 400 // TODO dedup
    const isTimeseriesError = timeseriesStatus >= 400

    return (
      <div className={classes.root}>
        {summaryIsFetching && <CircularProgress />}
        {!summaryIsFetching && ticker && isSummaryError && <Typography color="error">{summaryJson}</Typography>}
        {!summaryIsFetching && ticker && summaryJson && !isSummaryError &&
        <Summary
          companyName={summaryJson.companyName}
          employees={summaryJson.employees}
          industry={summaryJson.industry}
          sector={summaryJson.sector}
        />}
        {timeseriesIsFetching && <CircularProgress />}
        {!timeseriesIsFetching && ticker && isTimeseriesError && <Typography color="error">{timeseriesJson}</Typography>}
        {!timeseriesIsFetching && ticker && timeseriesJson && !isTimeseriesError &&
        <Timeseries 
          className={classes.chartContainer}
          data={timeseriesJson}
          interval={interval}
          onIntervalChange={editInterval}
          />}
      </div>
    )
  }
}

ConditionalRenderer.propTypes = {
  ticker: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  summaryJson: PropTypes.object,
  summaryStatus: PropTypes.number.isRequired,
  summaryIsFetching: PropTypes.bool.isRequired,
  timeseriesJson: PropTypes.array,
  timeseriesStatus: PropTypes.number.isRequired,
  timeseriesIsFetching: PropTypes.bool.isRequired,
  editInterval: PropTypes.func.isRequired,
  fetchSummaryStats: PropTypes.func.isRequired,
  fetchTimeseries: PropTypes.func.isRequired
}

export const mapStateToProps = store => ({
  ticker: store.ticker,
  interval: store.interval,
  summaryJson: store.summary.json,
  summaryStatus: store.summary.status,
  summaryIsFetching: store.summary.isFetching,
  timeseriesJson: store.timeseries.json,
  timeseriesStatus: store.timeseries.status,
  timeseriesIsFetching: store.timeseries.isFetching
})

export const mapDispatchToProps = dispatch => ({
  editInterval: interval => dispatch(actions.editInterval(interval)),
  fetchSummaryStats: ticker => dispatch(fetchSummaryStats(ticker)),
  fetchTimeseries: (ticker, interval) => dispatch(fetchTimeseries(ticker, interval))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ConditionalRenderer))
