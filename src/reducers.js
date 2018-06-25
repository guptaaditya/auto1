let initState = {
    merchants: [],
    bids: [],
    merchantWithBids: []
}

export default (state = initState, action) => {
  let newState = {};
  switch(action.type) {
    case 'GET_MERCHANTS':
      newState = Object.assign({}, state, {merchants: action.merchants});
    break;
    case 'GET_MERCHANTS_WITH_BIDS':
      newState = Object.assign({}, state, {merchantWithBids: action.merchantWithBids});
    break;
    case 'GET_BIDS':
      newState = Object.assign({}, state, {bids: action.bids});
    break
    default:
      newState = Object.assign({}, state);
  }
  return newState;
};
