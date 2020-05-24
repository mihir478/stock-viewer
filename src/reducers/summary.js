import actionTypes from '../actions/actionTypes'

const summary = (state = {
    isFetching: false,
    status: 200,
    json: null,
  }, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SUMMARY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case actionTypes.RECEIVE_SUMMARY:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status,
        json: action.json
      })
    default:
      return state
  }
}

export default summary
