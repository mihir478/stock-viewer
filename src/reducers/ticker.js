import actionTypes from '../actions/actionTypes'

const ticker = (state = '', action) => {
  switch (action.type) {
    case actionTypes.EDIT_TICKER:
      return action.value
    default:
      return state
  }
}

export default ticker
