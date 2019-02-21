import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitLogin, showAlert } from '../actions/login.action';
import '../styles/login.css';

class Login extends Component {
  constructor (props) {
    super (props);
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event) {
    
    const target = event.target;
    
    const value = (target.type === 'checkbox' ? target.checked : target.value);
    const name = target.id;
    
    this.setState({[name]: value});
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
  }

  checkEnterKey = (event) => {
    if (event.charCode == 13) {
      this.submitRecord();
    }
  };

  submitRecord = () => {
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
    
    let alert = {};
    let re = null;

    const data = {
      email:    this.state.email,
      pwd:      this.state.pwd
    };
    
    if ( ! data.email || ! data.pwd) {
      alert = {
        error: 1,
        msg: 'Login credentials are required.',
      };
      return this.props.showAlert(alert);
    }

    let email = data.email;
    // eslint-disable-next-line
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( ! re.test(String(email).toLowerCase())) {
      alert = {
        error: 1,
        msg: 'You need to supply a valid email address.'
      };

      return this.props.showAlert(alert);
    }
    
    this.props.submitLogin(data);
  };

  
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto'}}>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            <div className="well">
              <h1 style={{marginBottom: '20px'}}>Customer Login</h1>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control input-lg" onKeyPress={this.checkEnterKey} 
                onInput={ this.handleInputChange } id="email"/>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control input-lg" onKeyPress={this.checkEnterKey} 
                onChange={ this.handleInputChange } id="pwd"/>
              </div>
              <button id="btn-submit" className="btn btn-primary btn-lg" 
              onClick={ this.submitRecord }>
                  Login
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.login.alert
    // input: state.login.input
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    submitLogin: submitLogin,
    showAlert: showAlert
    // setInputValue: setInputValue
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
