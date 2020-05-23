const ticker = (state = '', action) => {
  switch (action.type) {
    case 'EDIT_TICKER':
      return action.value
    default:
      return state
  }
}

export default ticker
