import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBids } from 'src/actions'
import Pagination from 'src/components/pagination'
import { Redirect } from "react-router-dom"

import { Table, FormControl, ControlLabel } from 'react-bootstrap';

class Bids extends Component {
  constructor(props) {
    super(props);
    let activePage = 1;
    this.state = this.getState(this.props, activePage);
  }

  getState = (props, activePage) => {
    return {
      bidsToShow: this.getBidsToShow(props.bids, activePage) || [],
      activePage,
      resultsPerPage: 10,
      redirectTo: '',
      filterBidByMerchant: props.match.params.merchantId || -1
    };
  }

  getBidsToShow = (bids, activePage) => {
    return bids.slice( ((activePage * 10) - 10 ), activePage * 10);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname) {
      this.setState(this.getState(nextProps, 1), this.getBids);
    }
    if(nextProps.bids !== this.props.bids) {
      let bidsToShow = this.getBidsToShow(nextProps.bids, this.state.activePage);
      this.setState({bidsToShow});
    }
  }

  onPageNavigate = activePage => {
    let bidsToShow = this.getBidsToShow(this.props.bids, activePage);
    this.setState({bidsToShow, activePage});
  }

  getBids = () => {
    let params = {};
    if (this.state.filterBidByMerchant !== -1) {
      params.merchant = this.state.filterBidByMerchant
    }
    this.props.actions.getBids(params);
  }

  componentDidMount() {
    this.getBids();
  }

  filterBidsByMerchant = e => {
    if(parseInt(e.target.value) !== -1)
      this.setState({redirectTo: `/bids/${e.target.value}`})
    else
      this.setState({redirectTo: `/bids`})
  }

  render() {
    let bids = this.state.bidsToShow;
    let options = [];
    let { redirectTo } = this.state;
    if (redirectTo !== '') {
      return <Redirect to={redirectTo} />
    }
    options.push(<option key={-1} value={-1}>Show all bids</option>);
    this.props.merchants.forEach((m, index) => {
        options.push(<option key={index} value={m.merchantId}>{`${m.merchantName}`}</option>);
    });
    return (
      <div className="row">
        <div className="col-xs-12 col-md-offset-1 col-md-3">
          <ControlLabel>Filter by merchants</ControlLabel>
          <FormControl value={this.state.filterBidByMerchant} componentClass="select" placeholder="Show all bids" bsClass="form-control" onChange={this.filterBidsByMerchant}>
            {options}
          </FormControl>
        </div>
        <div className="col-xs-12 col-md-8">
          <Table responsive>
            <thead>
              <tr>
                <th>Car Title</th>
                <th className="pagerBar" width="15%">Amount (€)</th>
                <th className="pagerBar" width="15%">Merchant Name</th>
                <th className="pagerBar" width="15%">Created</th>
              </tr>
            </thead>
            <tbody>
              {bids && bids.length > 0 && bids.map((m, index) => {
                return (
                  <tr key={index}>
                    <td>{m.carTitle}</td>
                    <td className="pagerBar">{m.amount}</td>
                    <td className="pagerBar">{m.merchantName}</td>
                    <td className="pagerBar">{new Date(m.created*1000).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
          <Pagination onChange={this.onPageNavigate} numberOfPages={Math.max(Math.ceil(this.props.bids.length/this.state.resultsPerPage), 1)}
            activePage={this.state.activePage}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { bids: state.bids, merchants: state.merchantWithBids || [] };
};
const mapDispatchToProps = (dispatch) => { return {actions: bindActionCreators({ getBids }, dispatch)}}

export default connect(mapStateToProps, mapDispatchToProps)(Bids);
