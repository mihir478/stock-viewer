import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSummaryStats, fetchTimeseries } from '../actions'
import { CircularProgress, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Dashboard from './Dashboard'
import PriceChart from '../components/PriceChart'

const styles = () => ({
  root: {
    display: 'flex'
  }
})

class ConditionalRenderer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, ticker, interval } = this.props
    if (ticker) {
      dispatch(fetchSummaryStats(ticker))
      if (interval) {
        dispatch(fetchTimeseries(ticker, interval))
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, ticker, interval, timeseriesJson } = this.props
    if (ticker && ticker !== prevProps.ticker) {
      dispatch(fetchSummaryStats(ticker))
      dispatch(fetchTimeseries(ticker, interval))
    }
    else if (interval && interval !== prevProps.interval) {
      dispatch(fetchTimeseries(ticker, interval))
    }
  }

  render() {
    const classes = styles()
    const { ticker, summaryJson, summaryStatus, summaryIsFetching,
     timeseriesJson, timeseriesStatus, timeseriesIsFetching } = this.props
    const isSummaryError = summaryStatus >= 400 // TODO dedup
    const isTimeseriesError = timeseriesStatus >= 400
    return (
      <div className={classes.root}>
        {summaryIsFetching && <CircularProgress />}
        {!summaryIsFetching && ticker && isSummaryError && <Typography color="error">{summaryJson}</Typography>}
        {!summaryIsFetching && ticker && summaryJson && !isSummaryError &&
        <Dashboard
          companyName={summaryJson.companyName}
          employees={summaryJson.employees}
          industry={summaryJson.industry}
        />}
        {timeseriesIsFetching && <CircularProgress />}
        {!timeseriesIsFetching && ticker && isTimeseriesError && <Typography color="error">{timeseriesJson}</Typography>}
        {!timeseriesIsFetching && ticker && timeseriesJson && !isTimeseriesError &&
        <PriceChart data={timeseriesJson} />}
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
  dispatch: PropTypes.func.isRequired
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

export default withStyles(styles)(connect(mapStateToProps)(ConditionalRenderer))
