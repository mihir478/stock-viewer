import actionTypes from './actionTypes.js'
import fetch from 'cross-fetch'

const actions = {
  editTicker: ticker => ({
    type: actionTypes.EDIT_TICKER,
    value: ticker
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
  })
}

/* API CALLS */

export const fetchSummaryStats = ticker => {
  return dispatch => {
    dispatch(actions.requestSummaryStats(ticker))
    let status
    // promise needs to be resolved twice
    return fetch(`${IEX_CLOUD_API_URL}/stock/${ticker}/company?token=${IEX_API_KEY}`)
      .then(response => {
        status = response.status
        return response.json() 
      })
      .then(json => dispatch(actions.receiveSummaryStats(ticker, status, json)))
  }
}

export default actions
