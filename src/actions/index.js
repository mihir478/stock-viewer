import actionTypes from './actionTypes.js'
import fetch from 'cross-fetch'

const actions = {
  editTicker: ticker => ({
    type: actionTypes.EDIT_TICKER,
    value: ticker
  }),
  editInterval: interval => ({
    type: actionTypes.EDIT_INTERVAL,
    value: interval
  }),
  requestSummaryStats: ticker => ({
    type: actionTypes.REQUEST_SUMMARY,
    ticker
  }),
  receiveSummaryStats: (ticker, status, json) => ({
    type: actionTypes.RECEIVE_SUMMARY,
    ticker,
    status,
    json
  }),
  requestTimeseries: (ticker) => ({
    type: actionTypes.REQUEST_TIMESERIES,
    ticker
  }),
  receiveTimeseries: (ticker, status, json) => ({
    type: actionTypes.RECEIVE_TIMESERIES,
    ticker,
    status,
    json
  })
}

/* API CALLS */

// Note that promises need to be resolved twice when using cross fetch.

export const fetchSummaryStats = ticker => {
  return dispatch => {
    dispatch(actions.requestSummaryStats(ticker))
    let status
    return fetch(`${IEX_CLOUD_API_URL}/stock/${ticker}/company?token=${IEX_API_KEY}`)
      .then(response => {
        status = response.status
        return response.json() 
      })
      .then(json => dispatch(actions.receiveSummaryStats(ticker, status, json)))
  }
}

export const fetchTimeseries = (ticker, interval) => {
  return dispatch => {
    dispatch(actions.requestTimeseries(ticker))
    let status
    return fetch(`${IEX_CLOUD_API_URL}/stock/${ticker}/chart/${interval}?token=${IEX_API_KEY}`)
      .then(response => {
        status = response.status
        return response.json() 
      })
      .then(json => dispatch(actions.receiveTimeseries(ticker, status, json)))
  }
}

export default actions
