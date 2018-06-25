import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { FormGroup, FormControl, ControlLabel, Image, Button } from 'react-bootstrap'
import { addMerchant, editMerchant, getMerchant } from 'src/actions'
import FieldGroup from 'src/components/formField'
import validateEmail from 'src/utils'

class MerchantEditor extends Component {
  edit = false;

  constructor(props) {
    super(props);
    if(this.props.match.params && this.props.match.params.merchantId) {
      this.edit = true;
    }
    this.state = this.getState();
  }

  getState = params => {
    let state = {
      id: this.edit ? this.props.match.params.merchantId : 0,
      firstname: '',
      lastname: '',
      avatarUrl: '',
      email: '',
      phone: '',
      hasPremium: 0
    };
    state = Object.assign(state, params);
    return state;
  }

  componentDidMount() {
    if(this.edit) {
      getMerchant(this.state.id).then(m => {
        this.setState(this.getState(m));
      });
    }
  }

  onSaveMerchant = () => {
    let params = Object.assign({}, this.state);
    let res = null;
    if(!params.firstname.trim()) {
      return toast.error('Please enter the First Name');
    }
    if(!params.lastname.trim()) {
      return toast.error('Please enter the last Name');
    }
    if(!params.email) {
      return toast.error('Please enter a email address');
    }
    if(!validateEmail(params.email)) {
      return toast.error('Please enter a valid email address');
    }
    if(this.edit)
      res = this.props.actions.editMerchant(params);
    else
      res = this.props.actions.addMerchant(params);

    res.then(m => {
      toast.success('Merchant has been saved successfully')
      this.props.history.push(`/merchants`);
    });
  }

  onFieldUpdate = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  render() {
    return (
      <div className="col-xs-12 col-md-offset-2 col-md-8">
        <br />
        <FieldGroup
          type="text"
          label="First Name"
          value={this.state.firstname}
          onChange={e => this.onFieldUpdate('firstname', e.target.value ? e.target.value.trim(): '')}
        />
        <FieldGroup
          type="text"
          label="Last Name"
          value={this.state.lastname}
          onChange={e => this.onFieldUpdate('lastname', e.target.value ? e.target.value.trim(): '')}
        />
        { this.state.avatarUrl &&
            <Image height={40} src={this.state.avatarUrl} rounded />
        }
        <FieldGroup
          type="text"
          label="Avatar URL"
          help={!this.state.avatarUrl ? "To add avatar URL, please enter the external image file URL": ""}
          value={this.state.avatarUrl}
          onChange={e => this.onFieldUpdate('avatarUrl', e.target.value ? e.target.value.trim(): '')}
        />
        <FieldGroup
          type="email"
          label="Email address"
          placeholder="Please Enter email address"
          value={this.state.email}
          onChange={e => this.onFieldUpdate('email', e.target.value ? e.target.value.trim(): '')}
        />
        <FieldGroup
          type="tel"
          label="Phone"
          placeholder="Please Enter phone number"
          value={this.state.phone}
          onChange={e => this.onFieldUpdate('phone', e.target.value ? e.target.value.trim(): '')}
        />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select type of membership</ControlLabel>
          <FormControl componentClass="select" placeholder="Please select" value={this.state.hasPremium} onChange={e => this.onFieldUpdate('hasPremium', parseInt(e.target.value))}>
            <option value={0}>Regular</option>
            <option value={1}>Premium</option>
          </FormControl>
        </FormGroup>
        <div className="col-md-12 pagerBar">
          <Button onClick={this.onSaveMerchant}>Save</Button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { merchants: state.merchants };
};
const mapDispatchToProps = (dispatch) => { return {actions: bindActionCreators({ addMerchant, editMerchant }, dispatch)}}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditor);
