import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo , faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import SignUp from './pages/signup';
import EmailVerified from './pages/email_verified';
import EmailNotVerified from './pages/email_not_verified';
import Login from './pages/login';
import MarketPage from './pages/market_page';
import DomainSearch from './pages/domain_search';


library.add(faIgloo)
library.add(faShoppingCart)


class App extends Component {

  componentDidMount = () => {
    sessionStorage.setItem('baseUrl', 'http://localhost:3000');
    sessionStorage.setItem('apiUrl', 'http://localhost:8000');
    sessionStorage.setItem('cart', JSON.stringify({}));
    sessionStorage.setItem('cartCount', 0);
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

  isLoggedIn = () => {
    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div className="container-fluid">
          <div className="header">
            <div className="logo-box">
              <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
            </div>
            <div className="header-panel">
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"  />
              <span className="badge">5</span>
              <button className="btn btn-cart btn-lg">Checkout</button>
              <button onClick={this.logout} className="btn btn-default btn-lg">Logout</button>
            </div>
          </div>
          <Switch>
            <Route path="/" component={ SignUp } exact />
            <Route path="/email-verified" component={ EmailVerified } exact />
            <Route path="/email-not-verified" component={ EmailNotVerified } exact />
            <Route path="/login" component={ Login } exact />
            <Route path="/domain-search" component={ DomainSearch } exact />
            <Route path="/market-page" component={ MarketPage } exact />
          </Switch>
          <div className="footer">
              An Xtendly Company<br />
              &copy; 2019 Prosperna 
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  };


  isLoggedOut = () => {
    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div className="container-fluid">
          <div className="header">
            <div className="logo-box">
              <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
            </div>
            <div className="header-panel">
              <button onClick={this.login} className="btn btn-default btn-lg">Login</button>
            </div>
          </div>
          <Switch>
            <Route path="/" component={ SignUp } exact />
            <Route path="/email-verified" component={ EmailVerified } exact />
            <Route path="/email-not-verified" component={ EmailNotVerified } exact />
            <Route path="/login" component={ Login } exact />
          </Switch>
          <div className="footer">
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
