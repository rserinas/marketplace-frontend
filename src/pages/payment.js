import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm';
import { showAlert, getPayOption, finishTransaction } from '../actions/payment.action';
import '../styles/payment.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Payment extends Component {
  constructor (props) {
    super (props);

    if ( ! sessionStorage.getItem('total')) {
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('payment');
      const baseUrl = sessionStorage.getItem('baseUrl');
      return window.location = `${baseUrl}/market-page`;
    }
    
    if ( ! sessionStorage.getItem('payment')) sessionStorage.setItem('payment', true);

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


  setPaymentOption = (opt) => {
    this.props.getPayOption(opt);
  };


  showPaymentOption = () => {

    switch (this.props.trans.option) {
        case 'stripe':
          return this.showStripe();
          break;
        case 'paypal':
        return this.showPayPal();
          break;
        case 'coins':
        return this.showCoins();
          break;
    }
  }

  onPPSuccess = (payment) => {
    //console.log("The payment was succeeded!", payment);
    let data = {
      transId:        sessionStorage.getItem('transId'),
      extTransId:     payment.paymentID,
      payment_method: 'paypal',
      status:         'PD',
      extUserId:      payment.payerID,
      token:          payment.paymentToken
    };

    const apiUrl = sessionStorage.getItem('apiUrl');
    console.log(data);
    fetch (`${apiUrl}/user/transact/final`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
          this.props.showAlert(data);
        } else {
          sessionStorage.removeItem('cartCount');
          sessionStorage.removeItem('cart');
          sessionStorage.removeItem('subTotal');
          sessionStorage.removeItem('discount');
          sessionStorage.removeItem('total');
          sessionStorage.removeItem('payment');

          const baseUrl = sessionStorage.getItem('baseUrl');
          window.location = `${baseUrl}/get-started`;
        }
    });
  };

  onPPCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    this.props.showAlert({ error: 1, msg: 'PayPal Payment was cancelled.' });
  };

  onPPError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    this.props.showAlert({ error: 1, msg: err });
  };

  showCoins = () => {
    const paymentUrl = this.props.user.paymentUrl;

    return (
      <div>
        <a className="coins-link" href={paymentUrl}>Pay with Coins.ph</a>
      </div>
    );
  };

  showPayPal = () => {
    
    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = this.props.user.total // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

    const client = {
      sandbox:    'AUgRoZ7vXCXqOrZqnohQlC-L0cF9W-Fzr-eEhRbX94_xZx4zPhepTx0KLEDvLpM4K_TfhzDQmfbf0G4f',
      production: 'YOUR-PRODUCTION-APP-ID',
    }
    this.showDetails();
    return <PaypalExpressBtn env={env} client={client} currency={currency} total={total} 
    onError={this.onPPError} onSuccess={this.onPPSuccess} onCancel={this.onPPCancel} />;
  };

  showStripe = () => {
    const apiKey = sessionStorage.getItem('stripeApiKey')

    return (
        <StripeProvider apiKey={apiKey}>
        <div className="well">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  };

  showDetails = () => {
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    let title = '';
    switch (this.props.trans.option) {
      case 'stripe':
        title = 'Credit or Debit Card.';
        break;
      case 'paypal':
        title = 'Complete your payment using PayPal.';
        break;
      case 'coins':
        title = 'Coins.ph.';
        break;
      default:
        title = 'Complete your payment.';
    }

    if (this.props.trans.has_option) {
      return (
        <div style={{marginBottom: '30px', textAlign:"center"}}>
          <h1>{title}</h1>
          <p>
            {this.props.user.name}<br />
            {
                this.props.user.address1 + ', ' 
              + this.props.user.city + ', '
              + this.props.user.state + ', '
              + this.props.user.country
            }<br />
            {this.props.user.email}
          </p>
          <strong>TOTAL: ${parseFloat(this.props.user.total).toFixed(2)}</strong><br />
          {/* <strong>PESO TOTAL: ₱{parseFloat(this.props.user.pesoTotal).toFixed(2)}</strong> */}
        </div>
      );
    }
  };

  render() {
    let baseUrl = sessionStorage.getItem('baseUrl');
    
    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Select Payment Method</h3>
          <div className="step-container">
            <div className="step-box">
              <a href={`${baseUrl}/`}>
                <div className="step-img" id="first-blue"></div>
              </a>
              <p className="p-blue">Select Your Apps</p>
            </div>
            <div className="step-box">
              <a href={`${baseUrl}/signup`}>
                <div className="step-img" id="second-blue"></div>
              </a>
              <p className="p-blue">Create Your Account</p>
            </div>
            <div className="step-box">
              <a href={`${baseUrl}/checkout`}>
                <div className="step-img" id="third-blue"></div>
              </a>
              <p>Review Your Order</p>
            </div>
            <div className="step-box">
              <a href={`${baseUrl}/payment`}>
                <div className="step-img" id="fourth-blue"></div>
              </a>
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
                <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('stripe')}>
                      <div id="pay-stripe" className="gateway-img"></div>
                      <p>Credit or Debit Card</p>
                  </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                  <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('paypal')}>
                      <div id="pay-paypal" className="gateway-img"></div>
                      <p>Paypal</p>
                  </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('coins')}>
                      <div id="pay-coins" className="gateway-img"></div>
                      <p>Coins.ph</p>
                  </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link">
                      <div id="pay-dragon" className="gateway-img"></div>
                      <p>OTC via DragonPay</p>
                  </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link">
                      <div id="pay-gcash" className="gateway-img"></div>
                      <p>GCash</p>
                  </a>
                </div>
                <div className="col-xs-2 gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link">
                      <div id="pay-paymaya" className="gateway-img"></div>
                      <p>PayMaya</p>
                  </a>
                </div>
            </div>
            <div className="container" style={{clear: 'both'}}>  
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            </div>
            <div className="payment-option-box">
              { this.showDetails() }
              { this.props.trans.has_option == true ? this.showPaymentOption() : null }
            </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.pay.alert,
    trans: state.pay.trans,
    user: state.pay.user
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    getPayOption: getPayOption
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Payment);
