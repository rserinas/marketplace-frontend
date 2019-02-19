import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitSms, showAlert } from '../actions/sms_verify.action';
import '../styles/sms_verify.css';

class SmsVerify extends Component {
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
      this.submitCode();
    }
  };

  submitCode = () => {
    
    let alert = {};
    let re = null;

    const data = {
      userId: sessionStorage.getItem('userId'),
      digits: this.state.digits
    };
    
    if ( ! data.digits) {
      alert = {
        error: 1,
        msg: 'SMS verification code is required.',
      };
      return this.props.showAlert(alert);
    }

    let digits = data.digits;
    // eslint-disable-next-line
    re = /^[0-9]{5}$/;
    
    if ( ! re.test(String(digits))) {
      alert = {
        error: 1,
        msg: 'You need to supply a valid 5-digit SMS verification code.'
      };

      return this.props.showAlert(alert);
    }
    
    this.props.submitSms(data);
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
              <h1 style={{marginBottom: '20px'}}>SMS Verification</h1>
              <div className="form-group">
                <label htmlFor="digits">Code:</label>
                <input type="text" className="form-control input-lg" onKeyPress={this.checkEnterKey} 
                onInput={ this.handleInputChange } id="digits"/>
              </div>
              <button id="btn-submit" className="btn btn-primary btn-lg" 
              onClick={ this.submitCode }>
                  Verify
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
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    submitSms: submitSms,
    showAlert: showAlert
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SmsVerify);
