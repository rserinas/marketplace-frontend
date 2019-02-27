import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
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



library.add(faShoppingCart)


class App extends Component {

  componentDidMount = () => {

    let baseUrl = null; 
    
    if (window.location.protocol == 'https:') { 
      baseUrl = 'https://' + window.location.hostname;
    } else {
      baseUrl = 'http://' + window.location.hostname;
    }

    sessionStorage.setItem('baseUrl', baseUrl);
    sessionStorage.setItem('apiUrl', 'https://marketplace-api.prosperna.ph/');
    // sessionStorage.setItem('baseUrl', 'http://localhost:3000');
    // sessionStorage.setItem('apiUrl', 'http://localhost:8000');

    sessionStorage.setItem('stripeApiKey', 'pk_test_YbL8a2pBYQTqqexvbZvZCFJJ');

    // sessionStorage.setItem('fixerUrl', 'http://data.fixer.io/api/');
    // sessionStorage.setItem('fixerApiKey', '4240e4c004e509403492088b44de4356');
  }

  login = () => {
    let baseUrl = sessionStorage.getItem('baseUrl');

    window.location = `${baseUrl}`;
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

    this.login();
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
    let showSmsVerify = null;

    if (sms_verify == 0 && phone !== '') {
      showSmsVerify = <a className="verify-sms" href={`${baseUrl}/verify-sms`}>Verify Phone</a>;
    }

    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div className="container-fluid">
          <div className="header">
            <div className="logo-box">
              <a href={`${baseUrl}`}>
                <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
              </a>
            </div>
            <div className="header-panel">
              { showSmsVerify }
              { this.showCart() }
              <button onClick={this.logout} className="btn btn-default btn-md">Logout</button>
            </div>
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
            <Route path="/get-started" component={ GetStarted } exact />
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
              <div className="logo-box">
                <a href={`${baseUrl}`}>
                  <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
                </a>
              </div>
              <div className="header-panel">
                { this.showCart() }
                <button onClick={this.login} className="btn btn-default btn-lg">Login</button>
              </div>
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
