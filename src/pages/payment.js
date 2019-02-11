import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../actions/payment.action';
import '../styles/payment.css';

class Payment extends Component {
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

  
  render() {
    let baseUrl = sessionStorage.getItem('baseUrl');

    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Select Payment Method</h3>
          <div className="step-container">
            <div className="step-box">
              <div className="step-img" id="first-blue"></div>
              <p className="p-blue">Create Your Account</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="second-blue"></div>
              <p className="p-blue">Select Your Apps</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="third-blue"></div>
              <p>Review Your Order</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="fourth-blue"></div>
              <p>Select Payment Method</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="fifth"></div>
              <p>Get Started</p>
            </div>
            <div className="step-line"></div>
          </div>
        </div>
        <div className="container">
            <div className="gateway-container">
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-stripe" className="gateway-img"></div>
                        <p>Credit or Debit Card</p>
                    </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-paypal" className="gateway-img"></div>
                        <p>Paypal</p>
                    </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-coins" className="gateway-img"></div>
                        <p>Coins.ph</p>
                    </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-dragon" className="gateway-img"></div>
                        <p>OTC via DragonPay</p>
                    </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-gcash" className="gateway-img"></div>
                        <p>GCash</p>
                    </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                    <a href="#">
                        <div id="pay-paymaya" className="gateway-img"></div>
                        <p>PayMaya</p>
                    </a>
                </div>
            </div>          
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
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
    showAlert: showAlert
    // setInputValue: setInputValue
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Payment);
