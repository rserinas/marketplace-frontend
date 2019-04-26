import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Row, Col } from 'react-styled-flexboxgrid';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import SignUp from './pages/signup';
import EmailVerified from './pages/email_verified';
import EmailNotVerified from './pages/email_not_verified';
import Login from './pages/login';
import MarketPage from './pages/market_page';
import DomainSearch from './pages/domain_search';
import Checkout from './pages/checkout';
import Payment from './pages/payment';
import GetStarted from './pages/get_started';
import SmsVerify from './pages/sms_verify';
import Tos from './pages/tos';
import PrivacyPolicy from './pages/privacy';
import UserProfile from './pages/user_profile';
import UserEdit from './pages/user_edit';
import UserPassword from './pages/user_password';
import DomainPanel from './pages/domain_panel';
import DomainContactInfo from './pages/domain_contact_info';
import DomainAuthInfo from './pages/domain_auth_info';
import DomainAutoRenew from './pages/domain_auto_renew';
import DomainParkPage from './pages/domain_parkpage';
import DomainLockState from './pages/domain_lock_state';
import DomainWhoisPrivacy from './pages/domain_whois_privacy';
// import DomainRenew from './pages/domain_renew';


library.add(faShoppingCart)


class App extends Component {

  componentDidMount = () => {

    let baseUrl = null; 
    
    if (window.location.protocol === 'https:') { 
      baseUrl = 'https://' + window.location.hostname;
    } else {
      baseUrl = 'http://' + window.location.hostname;
    }
    
    //************************** */
    const is_live = false;
    //************************** */

    if (is_live) {
      sessionStorage.setItem('baseUrl', baseUrl);
      // THEA, edit also the .ph to .com
      sessionStorage.setItem('apiUrl', 'https://marketplace-api.prosperna.com');
      // Stripe Live Key
      sessionStorage.setItem('stripeApiKey', 'pk_live_OKhCnhs83dWPNluclknbJBDG');
      // Paypal sandbox
      sessionStorage.setItem('ppEnv', 'production');
    } else {
      // This is the dev environment
      // sessionStorage.setItem('baseUrl', baseUrl);
      // sessionStorage.setItem('apiUrl', 'https://marketplace-api.prosperna.ph');
      // This is a local environment
      sessionStorage.setItem('baseUrl', 'http://localhost:3000');
      sessionStorage.setItem('apiUrl', 'http://localhost:8000');
      // Stripe Test Key
      sessionStorage.setItem('stripeApiKey', 'pk_test_YbL8a2pBYQTqqexvbZvZCFJJ');
      // Paypal sandbox
      sessionStorage.setItem('ppEnv', 'sandbox');
    }
    
    sessionStorage.setItem('pesoRate', 53);
  }

  login = () => {
    let baseUrl = sessionStorage.getItem('baseUrl');

    window.location = `${baseUrl}/login`;
  };

  logout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('fname');
    sessionStorage.removeItem('lname');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('status');
    sessionStorage.removeItem('sms_verify');
    sessionStorage.removeItem('cartCount');
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('payment');
    sessionStorage.removeItem('subTotal');
    sessionStorage.removeItem('discount');
    sessionStorage.removeItem('total');
    sessionStorage.removeItem('pesoTotal');
    sessionStorage.removeItem('transId');
    sessionStorage.removeItem('paymentUrl');
    sessionStorage.removeItem('extTransId');
    sessionStorage.removeItem('domains');

    let baseUrl = sessionStorage.getItem('baseUrl');

    window.location = `${baseUrl}`;
  }

  checkLogin = () => {
    
    let userId = sessionStorage.getItem('userId');
    let email = sessionStorage.getItem('email');

    if (userId && email) {
      return this.isLoggedIn();
    } else {
      return this.isLoggedOut();
    }
  };

  showCart = () => {
    const cartCount   = sessionStorage.getItem('cartCount');
    
    // eslint-disable-next-line
    if (cartCount != null) {
      return ( 
        <div style={{display:'inline-block'}}> 
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"  />
          <span className="badge">{cartCount}</span>
          { sessionStorage.getItem('userId') ? 
            <button onClick={this.gotoCheckout} className="btn btn-cart btn-md">Checkout</button>
          : null 
          }
        </div>
      );
    } else {
      return (
        <div style={{display:'inline-block'}}> 
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"  />
          <span className="badge">0</span>
        </div>
      );
    }
  };

  gotoCheckout = () => {
    let baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/checkout`;
  };

  isLoggedIn = () => {
    const baseUrl     = sessionStorage.getItem('baseUrl');
    const sms_verify  = sessionStorage.getItem('sms_verify');
    const phone       = sessionStorage.getItem('phone');
    let domains       = sessionStorage.getItem('domains');
    
    let showSmsVerify = null;

    if (sms_verify === 0 && phone !== '') {
      showSmsVerify = <a className="verify-sms" href={`${baseUrl}/verify-sms`}>Verify Phone</a>;
    }

    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div className="container-fluid">
          <div className="header">

            <Col lg={true} md={true} sm={true} xs={false}>
              <Row >
                <Col md={6} sm={6} xs={12}>
                  <a href={`${baseUrl}`}>
                    <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
                  </a>
                </Col>
                <Col md={6} sm={6} xs={12} className="header-panel">
                  { showSmsVerify }
                  { this.showCart() }
                  <button onClick={this.logout} className="btn btn-default btn-md">Logout</button>
                </Col>
              </Row>
            </Col>

            <Col md={false} lg={false} sm={false} xs={true}>
              <Row style={{textAlign: 'center'}} >
                <Col xs={12}>
                  <a href={`${baseUrl}`}>
                    <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
                  </a>
                </Col>
                <Col  xs={12} className="shaded">
                  { showSmsVerify }
                  { this.showCart() }
                  <button onClick={this.logout} className="btn btn-default btn-md">Logout</button>
                </Col>
              </Row>
            </Col>
          </div>
          <div className="nav-bar">
            <a href={`${baseUrl}/user-profile`} className="main-link">User Profile</a>
            { (domains != 'false') ?
              <a href={`${baseUrl}/domain-panel`} className="main-link">Domain Panel</a>
            :
              null
            }
          </div>
          <Switch>
            <Route path="/" component={ MarketPage } exact />
            <Route path="/domain-search" component={ DomainSearch } exact />
            <Route path="/signup" component={ SignUp } exact />
            <Route path="/email-verified" component={ EmailVerified } exact />
            <Route path="/email-not-verified" component={ EmailNotVerified } exact />
            <Route path="/terms-of-service" component={ Tos } exact />
            <Route path="/privacy-policy" component={ PrivacyPolicy } exact />
            <Route path="/login" component={ Login } exact />
            <Route path="/verify-sms" component={ SmsVerify } exact />
            <Route path="/checkout" component={ Checkout } exact />
            <Route path="/payment" component={ Payment } exact />
            <Route path="/get-started/finished" component={ GetStarted } />
            <Route path="/user-profile" component={ UserProfile } exact />
            <Route path="/user-edit" component={ UserEdit } exact />
            <Route path="/user-password" component={ UserPassword } exact />
            <Route path="/domain-panel" component={ DomainPanel } exact />
            <Route path="/domain/contact-info" component={ DomainContactInfo } exact />
            <Route path="/domain/auth-info" component={ DomainAuthInfo } exact />
            <Route path="/domain/auto-renew" component={ DomainAutoRenew } exact />
            <Route path="/domain/parkpage" component={ DomainParkPage } exact />
            <Route path="/domain/lock-state" component={ DomainLockState } exact />
            <Route path="/domain/whois-privacy" component={ DomainWhoisPrivacy } exact />
            {/* <Route path="/domain/renew" component={ DomainRenew } exact /> */}
          </Switch>
          <div className="footer">
            <div className="footer-img"></div>
            An Xtendly Company<br />
            &copy; 2019 Prosperna 
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  };


  isLoggedOut = () => {
    const baseUrl     = sessionStorage.getItem('baseUrl');

    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="container-fluid">
            <div className="header">

              <Col lg={true} md={true} sm={true} xs={false}>
                <Row >
                  <Col md={6} sm={6} xs={12}>
                    <a href={`${baseUrl}`}>
                      <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
                    </a>
                  </Col>
                  <Col md={6} sm={6} xs={12} className="header-panel">
                    { this.showCart() }
                    <button onClick={this.login} className="btn btn-default btn-md">Login</button>
                  </Col>
                </Row>
              </Col>

              <Col md={false} lg={false} sm={false} xs={true}>
                <Row style={{textAlign: 'center'}} >
                  <Col xs={12}>
                    <a href={`${baseUrl}`}>
                      <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
                    </a>
                  </Col>
                  <Col  xs={12} className="shaded">
                    { this.showCart() }
                    <button onClick={this.login} className="btn btn-default btn-md">Login</button>
                  </Col>
                </Row>
              </Col>

            </div>
            <Switch>
              <Route path="/" component={ MarketPage } exact />
              <Route path="/domain-search" component={ DomainSearch } exact />
              <Route path="/signup" component={ SignUp } exact />
              <Route path="/email-verified" component={ EmailVerified } exact />
              <Route path="/email-not-verified" component={ EmailNotVerified } exact />
              <Route path="/terms-of-service" component={ Tos } exact />
              <Route path="/privacy-policy" component={ PrivacyPolicy } exact />
              <Route path="/login" component={ Login } exact />
            </Switch>
            <div className="footer">
              <div className="footer-img"></div>
              An Xtendly Company<br />
              &copy; 2019 Prosperna 
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  };
  
  render(props) {
    return this.checkLogin();
  }
}

export default App;
