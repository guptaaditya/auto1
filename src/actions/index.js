import request from 'src/api';

export function receiveMerchants(merchants) {
  return {type: 'GET_MERCHANTS', merchants};
}

export function receiveMerchantsWithBids(merchantWithBids) {
  return {type: 'GET_MERCHANTS_WITH_BIDS', merchantWithBids};
}

export function receiveBids(bids) {
  return {type: 'GET_BIDS', bids};
}

export function getMerchant(id) {
  return request('getMerchant', id);
}

export function getMerchants() {
  return dispatch => {
    return request('getMerchants').then(m => dispatch(receiveMerchants(m)));
  }
}

export function getMerchantsWithBids() {
  return dispatch => {
    request('getMerchantsWithBids').then(m => dispatch(receiveMerchantsWithBids(m)));
  }
}

export function addMerchant(params) {
  return dispatch => {
    return request('addMerchant', params).then(m => dispatch(receiveMerchants(m)));
  }
}

export function editMerchant(params) {
  return dispatch => {
    return request('editMerchant', params).then(m => dispatch(receiveMerchants(m)));
  }
}

export function deleteMerchant(params) {
  return dispatch => {
    return request('deleteMerchant', params).then(m => dispatch(receiveMerchants(m)));
  }
}

export function getBids(params) {
  return dispatch => {
    return request('getBids', params).then(m => dispatch(receiveBids(m)));
  }
}

export default getMerchants;
