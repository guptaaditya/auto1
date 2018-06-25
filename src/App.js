import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { withRouter } from 'react-router'

//Import the components to be loaded on routes
import Container from 'src/components/container'
import NotFound from 'src/components/default'
import Bids from 'src/components/bids'
import Merchants from 'src/components/merchants'
import MerchantEditor from 'src/components/merchants/editor'
import Header from 'src/components/header/'

const HeaderWithLocation = withRouter(Header);

export class RoutesList extends Component {
  render(){
    return (
      <Router>
        <Container>
          <Route path="/" component={HeaderWithLocation} />
          <div style={{padding: '0 20px'}}>
            <Switch>
              <Redirect exact from='/' to='/merchants' />
              <Route exact path="/merchants" component={Merchants} />
              <Route exact path="/merchant/add" component={MerchantEditor} />
              <Route exact path="/merchant/edit/:merchantId" component={MerchantEditor} />
              <Route exact path="/bids" component={Bids} />
              <Route exact path="/bids/:merchantId" component={Bids} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>
      </Router>
    );
  }
}

export default RoutesList;
