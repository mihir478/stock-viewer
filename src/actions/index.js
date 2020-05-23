import actionTypes from './actionTypes.js';

export const actions = {
  editTicker: ticker => ({
    type: actionTypes.EDIT_TICKER,
    value: ticker
  })
};

export default actions;
