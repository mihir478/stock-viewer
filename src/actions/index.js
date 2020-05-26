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

export const fetchSummaryStats = ticker => {
  return dispatch => {
    dispatch(actions.requestSummaryStats(ticker))
    let status
    fetch(`${IEX_CLOUD_API_URL}/stock/${ticker}/company?token=${IEX_API_KEY}`)
      .then(companyResponse => { 
          return companyResponse.json()
      }).then(companyJson => {
        return fetch(`${IEX_CLOUD_API_URL}/stock/${ticker}/income?token=${IEX_API_KEY}`)
          .then(incomeResponse => {
            status = incomeResponse.status
            return incomeResponse.json() 
          })
          .then(incomeJson => dispatch(actions.receiveSummaryStats(ticker, status, {...incomeJson, companyName: companyJson.companyName })))
      })
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
