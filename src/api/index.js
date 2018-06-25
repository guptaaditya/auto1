import originalData from 'src/data';

let data = [...originalData]; // operated data
let merchantWithBids = data.map(m => {
  m.bids.forEach(b => {
    b.merchantName = `${m.firstname} ${m.lastname}`;
    b.merchantId = m.id;
  });
  return {merchantName: `${m.firstname} ${m.lastname}`, merchantId: m.id};
});


function getMerchant(id) {
  let merchant = data.find(m => m.id === parseInt(id));
  if (merchant) {
    merchant = {...merchant};
  }
  return modulateMerchantData(merchant);
}

function modulateMerchantData(m) {
  m.bidCount = m.bids ? m.bids.length : 0;
  delete m.bids;
  return m;
}

function getMerchants() {
  return data.map(i => {
    let ob = {...i};
    return modulateMerchantData(ob);
  });
}

function getMerchantsWithBids() {
  return merchantWithBids;
}

//Saves new Merchant and returns complete list of Merchants thereafter
function addMerchant(params) {
  const { id } = data[data.length - 1];
  params.id = id+1;
  data.push(params);
  return getMerchants();
}

//Saves edited Merchant and returns complete list of Merchants thereafter. Params will be complete merchant object
function editMerchant(params) {
  let merchant = data.find(m => m.id === params.id)
  Object.assign(merchant, params);
  return getMerchants();
}

//Deletes Merchant by id and returns complete list of Merchants thereafter.
function deleteMerchant(params) {
  data = data.filter(m => m.id !== params.id);
  return getMerchants();
}

//  filter object can have merchant property with value of merchant id
function getBids(filter) {
  let bids = data.reduce(function(current = [], next){
    if (filter && filter.merchant) {
      if (parseInt(next.id) === parseInt(filter.merchant))
        return current.concat(next.bids);
      else
        return current;
    }
    else {
      return current.concat(next.bids);
    }
  }, []);

  return bids; //bids variable can be used to add sort by functionality
}

const methods = {
  getMerchants, addMerchant, editMerchant, deleteMerchant, getBids, getMerchantsWithBids, getMerchant
};

const handler = {
  apply: function(method, thisArg, args) {
    let params = args[1] ? args[1] : undefined;
    return method(args[0], params);
  }
};

function send(fn, params) {
  return Promise.resolve(methods[fn](params));
}

const request = new Proxy(send, handler);

export default request;
