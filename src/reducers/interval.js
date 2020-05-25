import actionTypes from '../actions/actionTypes'

const interval = (state = '1m', action) => {
  switch (action.type) {
    case actionTypes.EDIT_INTERVAL:
      return action.value
    default:
      return state
  }
}

export default interval
