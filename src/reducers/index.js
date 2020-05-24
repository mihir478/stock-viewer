import { combineReducers } from 'redux'
import ticker from './ticker'
import summary from './summary'

export default combineReducers({
  ticker,
  summary
})
