import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUp from './pages/signup';
import EmailVerified from './pages/email_verified';
import EmailNotVerified from './pages/email_not_verified';
import Login from './pages/login';
import MarketPage from './pages/market_page';


class App extends Component {
  
  componentDidMount = () => {
    sessionStorage.setItem('baseUrl', 'http://localhost:3000');
    sessionStorage.setItem('apiUrl', 'http://localhost:8000');
  }
  
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div className="container-fluid">
          <div style={{padding:'20px'}}>
            <img src={'../prosperna-logo.png'} alt="Prosperna Logo" />
          </div>
          <Switch>
            <Route path="/" component={ SignUp } exact />
            <Route path="/email-verified" component={ EmailVerified } exact />
            <Route path="/email-not-verified" component={ EmailNotVerified } exact />
            <Route path="/login" component={ Login } exact />
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
  }
}

export default App;
