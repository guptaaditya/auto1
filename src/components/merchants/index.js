import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Glyphicon, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify'

import { getMerchants, deleteMerchant } from 'src/actions'
import Pagination from 'src/components/pagination'
import Confirm from 'src/components/modals/confirm'

class Merchants extends Component {
  constructor(props) {
    super(props);
    let activePage = 1;
    this.state = {
      merchantsToShow: this.getMerchantsToShow(this.props.merchants, activePage) || [],
      activePage,
      resultsPerPage: 10,
      deleteMerchantShow: false,
      deleteMerchantId: 0
    }
  }

  getMerchantsToShow = (merchants, activePage) => {
    return merchants.slice( ((activePage * 10) - 10 ), activePage * 10);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.merchants !== this.props.merchants) {
      let merchantsToShow = this.getMerchantsToShow(nextProps.merchants, this.state.activePage);
      this.setState({merchantsToShow});
    }
  }

  onPageNavigate = activePage => {
    let merchantsToShow = this.getMerchantsToShow(this.props.merchants, activePage);
    this.setState({merchantsToShow, activePage});
  }

  removeMerchant = mId => {
    this.setState({deleteMerchantShow: true, deleteMerchantId: mId});
  }

  editMerchant = merchantId => {
    this.props.history.push(`/merchant/edit/${merchantId}`);
  }

  viewBids = merchantId => {
    this.props.history.push('/bids/'+merchantId);
  }

  componentDidMount() {
    this.props.actions.getMerchants();
  }

  onAddMerchant = () => {
    this.props.history.push(`/merchant/add`);
  }

  deleteMerchant = () => {
    this.props.actions.deleteMerchant({id: this.state.deleteMerchantId}).then(e => toast.success('Merchant has been deleted successfully'));
    this.cancelDeletemerchant();
  }

  cancelDeletemerchant = () => {
    this.setState({deleteMerchantShow: false, deleteMerchantId: 0});
  }

  render() {
    let merchants = this.state.merchantsToShow;
    return (
      <div className="col-xs-12 col-md-offset-2 col-md-8">
        <Table responsive>
          <thead>
            <tr>
              <th className="actions" onClick={this.onAddMerchant}><Glyphicon glyph="plus" /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="pagerBar">Premium(?)</th>
              <th className="pagerBar">Total Bids</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {merchants && merchants.length > 0 && merchants.map((m, index) => {
              return (
                <tr key={index}>
                  <td colSpan={2}>
                    <span><img src={m.avatarUrl} height={40} /></span>
                    <span className="ml-20">{`${m.firstname} ${m.lastname}`}</span>
                  </td>
                  <td>{m.email}</td>
                  <td>{m.phone}</td>
                  <td className="pagerBar">{m.hasPremium ? 'Yes': 'No'}</td>
                  <td className="pagerBar"><Badge>{m.bidCount}</Badge></td>
                  <td width={100} className="pagerBar actions">
                    <Glyphicon glyph="pencil" onClick={e => this.editMerchant(m.id)} title="Edit merchant" />
                    {m.bidCount > 0 && <Glyphicon className="ml-20" glyph="th-list" onClick={e => this.viewBids(m.id)} title="View merchant bids" />}
                    <Glyphicon className="ml-20" glyph="remove" onClick={e => this.removeMerchant(m.id)} title="Delete merchant" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <Pagination onChange={this.onPageNavigate} numberOfPages={Math.max(Math.ceil(this.props.merchants.length/this.state.resultsPerPage), 1)}
           activePage={this.state.activePage}
        />
        <Confirm title='Delete Merchant?' body='Are you sure you want to delete this merchant?'
          progressButtonText='Delete' onProgress={this.deleteMerchant} show={this.state.deleteMerchantShow} handleClose={this.cancelDeletemerchant} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { merchants: state.merchants };
};
const mapDispatchToProps = (dispatch) => { return {actions: bindActionCreators({ getMerchants, deleteMerchant }, dispatch)}}

export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
