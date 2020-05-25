import { combineReducers } from 'redux'
import ticker from './ticker'
import interval from './interval'
import summary from './summary'
import timeseries from './timeseries'

export default combineReducers({
  ticker,
  interval,
  summary,
  timeseries
})
