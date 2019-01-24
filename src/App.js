import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUp from './pages/signup';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={ SignUp } exact />
          </Switch>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
