import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkout_form';
import { showAlert, getPayOption, finishTransaction } from '../actions/payment.action';
import '../styles/payment.css';
import { Row, Col } from 'react-styled-flexboxgrid';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class Payment extends Component {
  constructor (props) {
    super (props);

    if ( ! sessionStorage.getItem('total')) {
      //sessionStorage.removeItem('cart');
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
        case 'dragonpay':
        return this.showDragonpay();
        break;
    }
  }

  onPPSuccess = (payment) => {
    const cart  = JSON.parse(sessionStorage.getItem('cart'));
    let product = '';
    cart.map((a, i) => {
      product = a.product;
    });
    if(product === "website builder"){
      window.location = `https://mpwb-api.prosperna.ph/`;
    }   
    else{
      let data = {
        transId:        sessionStorage.getItem('transId'),
        extTransId:     payment.paymentID,
        payment_method: 'paypal',
        status:         'pd',
        extUserId:      payment.payerID,
        token:          payment.paymentToken
      };
  
      const apiUrl = sessionStorage.getItem('apiUrl');
      
      fetch (`${apiUrl}/user/transact/final`, {
          method: 'POST',
          dataType: 'jsonp',
          body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(data => {
          if (data.error) {
            this.props.showAlert(data);
            // this.setState({ showAlertPaypal: "block", alertMessage: JSON.stringify(data.msg) })
            // $( "#showModal" ).click();
            // $( "#showModal" ).click();
            // console.log("error "+JSON.stringify(data.msg));
          } else {
            
            sessionStorage.removeItem('cartCount');
            //sessionStorage.removeItem('cart');
            sessionStorage.removeItem('subTotal');
            sessionStorage.removeItem('discount');
            sessionStorage.removeItem('total');
            sessionStorage.removeItem('payment');
            sessionStorage.removeItem('pesoTotal');
            sessionStorage.removeItem('transId');
            sessionStorage.removeItem('paymentUrl');
            sessionStorage.removeItem('extTransId');
            
            const baseUrl = sessionStorage.getItem('baseUrl');
            window.location = `${baseUrl}/get-started/finished`;
          }
      });
    }
    
  };

  onPPCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    this.props.showAlert({ error: 1, msg: 'PayPal Payment was cancelled.' });
    window.location.reload();
  };

  onPPError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    this.props.showAlert({ error: 1, msg: err });
  };

  showDragonpay = () => {
    let transId = sessionStorage.getItem('transId');
    let fname = sessionStorage.getItem('fname');
    let lname = sessionStorage.getItem('lname');
    let fullname = fname+" "+lname;
    let email = sessionStorage.getItem('email');
    let total = sessionStorage.getItem('pesoTotal');
    const cart  = JSON.parse(sessionStorage.getItem('cart'));
    let product = '';
    cart.map((a, i) => {
      product = a.product;
    });

    let gbURL = sessionStorage.getItem('gbURL')+"&invoiceno="+transId+"&name="+fullname.replace(/ /g, "+")+"&email="+email.replace(/@/g, "%40")+"&amount="+total+"&remarks="+product.replace(/ /g, "+");
    console.log("dragonpay url: "+gbURL);
    
    const element = (
      <React.Fragment>
        <button id="showModal" style={{display:'none'}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#paypalModal"></button>
        <div className="modal fade" id="paypalModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.showDetails()}
                <div>
                  <a className="dragonpay-link" href={gbURL}>Pay with Dragonpay</a>
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    ReactDOM.render(element, document.getElementById('gateway'),() => {
      $( "#showModal" ).click()
    });
  }

  showCoins = () => {
    const paymentUrl = sessionStorage.getItem('paymentUrl');

    const element = (
      <React.Fragment>
        <button id="showModal" style={{display:'none'}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#paypalModal"></button>
        <div className="modal fade" id="paypalModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.showDetails()}
                <div>
                  <a className="coins-link" href={paymentUrl}>Pay with Coins.ph</a>
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    ReactDOM.render(element, document.getElementById('gateway'),() => {
      $( "#showModal" ).click()
    });
    // return (
      // <div>
      //   <a className="coins-link" href={paymentUrl}>Pay with Coins.ph</a>
      // </div>
    // );
  };

  showPayPal = () => {
    let env = sessionStorage.getItem('ppEnv'); // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    var total = parseInt(sessionStorage.getItem("total"), 10); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    
    let iansandbox = 'Af33CDnj2h85O5QvEEpEb2b84WtYBFf-phRbMUrBDbAKRSnmKJhRNXIe-U247M5AV2_ltJX8PJvUXcK0';
    let ianproduction = 'AZ-W6HzrYjv4RT73SuIcJ8gz9HKalcvceRHM4Azd2qzsJg8Iqi_5K4k5rlauOXlnsRd3JjtLiukMUbee';
    
    let bosssandbox = 'AUgRoZ7vXCXqOrZqnohQlC-L0cF9W-Fzr-eEhRbX94_xZx4zPhepTx0KLEDvLpM4K_TfhzDQmfbf0G4f';
    let bossproduction = 'AXk4e1-HrsJlc6v6T9KAFwL52s__Wx7NJCQMYpPh6n1AAAninwJMhXi0hH9sLAAJFSSnXrlxfRhEo4am';
    
    const client = {
      sandbox:    bosssandbox,
      production: bossproduction,
    }

    
    const element = (
      <React.Fragment>
        <button id="showModal" style={{display:'none'}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#paypalModal"></button>
        <div className="modal fade" id="paypalModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.showDetails()}
                <PaypalExpressBtn env={env} client={client} currency={currency} total={total}
                onError={this.onPPError} onSuccess={this.onPPSuccess} onCancel={this.onPPCancel} />
                <br />
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    ReactDOM.render(element, document.getElementById('gateway'),() => {
      $( "#showModal" ).click()
    });
    
    // return <PaypalExpressBtn env={env} client={client} currency={currency} total={total}
    // onError={this.onPPError} onSuccess={this.onPPSuccess} onCancel={this.onPPCancel} />;

  };

  showStripe = () => {
    const apiKey = sessionStorage.getItem('stripeApiKey')

    const element = (
      <React.Fragment>
        <button id="showModal" style={{display:'none'}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#paypalModal"></button>
        <div className="modal fade" id="paypalModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
                { this.showDetails() }
                <StripeProvider apiKey={apiKey}>
                  <div className="well">
                    <Elements>
                      <CheckoutForm />
                    </Elements>
                  </div>
                </StripeProvider>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    ReactDOM.render(element, document.getElementById('gateway'),() => {
      $( "#showModal" ).click()
    });
    // return (
    //   <React.Fragment>
    //     { this.showDetails() }
    //     <StripeProvider apiKey={apiKey}>
    //       <div className="well">
    //         <Elements>
    //           <CheckoutForm />
    //         </Elements>
    //       </div>
    //     </StripeProvider>
    //   </React.Fragment>
    // );
  };

  showDetails = () => {
    
    // if (this.props.alert.error !== 2) {
    //   this.props.showAlert({ error: 2, msg: '' });
    // }

    let title = '';
    let paymentMethod = '';

    switch (this.props.trans.option) {
      case 'stripe':
        title = 'Complete your payment using Credit or Debit Card.';
        paymentMethod = 'stripe';
        break;
      case 'paypal':
        title = 'Complete your payment using PayPal.';
        paymentMethod = 'paypal';
        break;
      case 'coins':
        title = 'Complete your payment using Coins.ph.';
        paymentMethod = 'coins';
        break;
      case 'dragonpay':
        title = 'Complete your payment using Dragonpay.';
        paymentMethod = 'dragonpay';
        break;
      default:
        title = 'Complete your payment.';
    }

    if (this.props.trans.has_option) {
      
      return (
        <div id={paymentMethod} style={{marginBottom: '30px', textAlign:"center"}}>
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
          { 
            (this.props.trans.option != 'coins') ? 
              (this.props.trans.option != 'dragonpay') ? 
                <strong>TOTAL: ${parseFloat(this.props.user.total).toFixed(2)}</strong>
              :
                <strong>PHP TOTAL: ₱{parseFloat(this.props.user.pesoTotal).toFixed(2)}</strong>
            : 
            <strong>PHP TOTAL: ₱{parseFloat(this.props.user.pesoTotal).toFixed(2)}</strong>
          }
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
            <div className="step-line"></div>
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
              <p className="p-blue">Review Your Order</p>
            </div>
            <div className="step-box">
              <a href={`${baseUrl}/payment`}>
                <div className="step-img" id="fourth-blue"></div>
              </a>
              <p className="p-blue">Select Payment Method</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="fifth"></div>
              <p>Get Started</p>
            </div>
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

        <div className="container">
            <div className="gateway-container">
              <Row>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('stripe')}>
                      <img src="/pay-stripe.png" alt="Credit card" className="responsive" />
                      <p>Credit or Debit Card</p>
                  </a>
                </Col>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                  <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('paypal')}>
                      <img src="/pay-paypal.png" alt="Paypal" className="responsive" />
                      <p>Paypal</p>
                  </a>
                </Col>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('coins')}>
                      <img src="/pay-coins.png" alt="Coins.ph" className="responsive" />
                      <p>Coins.ph</p>
                  </a>
                </Col>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                  <p className="available">AVAILABLE</p>
                  <a className="pay-link" onClick={(e) => this.setPaymentOption('dragonpay')}>
                      <img src="/pay-dragon.png" alt="Dragonpay" className="responsive" />
                      <p>OTC via DragonPay</p>
                  </a>
                </Col>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link">
                      <img src="/pay-gcash.png" alt="Gcash" className="responsive" />
                      <p>GCash</p>
                  </a>
                </Col>
                <Col md={2} sm={2} xs={4} className="gateway-solo">
                  <p>COMING SOON</p>
                  <a className="pay-link">
                      <img src="/pay-paymaya.png" alt="PayMaya" className="responsive" />
                      <p>PayMaya</p>
                  </a>
                </Col>
              </Row>
            </div>
            <div id="gateway" className="payment-option-box">
              {/* { this.showDetails() } */}
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
