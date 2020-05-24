import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSummaryStats } from '../actions'
import { CircularProgress, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import Dashboard from './Dashboard'

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
    const { dispatch, ticker } = this.props
    if (ticker)
      dispatch(fetchSummaryStats(ticker))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, ticker } = this.props
    if (ticker && ticker !== prevProps.ticker) {
      dispatch(fetchSummaryStats(ticker))
    }
  }

  render() {
    const classes = styles()
    const { ticker, json, status, isFetching } = this.props
    const isError = status >= 400;
    return (
      <div className={classes.root}>
        {isFetching && <CircularProgress />}
        {!isFetching && ticker && isError && <Typography color="error">{json}</Typography>}
        {!isFetching && json && !isError &&
        <Dashboard
          companyName={json.companyName}
          employees={json.employees}
          industry={json.industry}
        />}
      </div>
    )
  }
}

ConditionalRenderer.propTypes = {
  ticker: PropTypes.string.isRequired,
  json: PropTypes.object,
  status: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export const mapStateToProps = store => ({
  ticker: store.ticker,
  json: store.summary.json,
  status: store.summary.status,
  isFetching: store.summary.isFetching
})

export default withStyles(styles)(connect(mapStateToProps)(ConditionalRenderer))
