import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    const apiUrl = sessionStorage.getItem('apiUrl');
    const userId = sessionStorage.getItem('userId');
    const emailAdd = sessionStorage.getItem('email');

    let {token} = await this.props.stripe.createToken({email: emailAdd});
    token.userId = userId;
    token.email = emailAdd;
    token.cart = sessionStorage.getItem('cart');
    token.subTotal = sessionStorage.getItem('subTotal');
    token.discount = sessionStorage.getItem('discount');
    token.total = sessionStorage.getItem('total');
    token.pesoTotal = sessionStorage.getItem('pesoTotal');
    token.transId = sessionStorage.getItem('transId');

    fetch (`${apiUrl}/charge`, {
      method: 'POST',
      dataType: 'jsonp',
      body: JSON.stringify(token),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error === 1) {
          this.props.showAlert(data);
        } else {
          // sessionStorage.setItem('domains', JSON.stringify(data.domains));
          sessionStorage.removeItem('cartCount');
          //sessionStorage.removeItem('cart');
          sessionStorage.removeItem('subTotal');
          sessionStorage.removeItem('discount');
          sessionStorage.removeItem('total');      
          sessionStorage.removeItem('payment');
    
          const baseUrl = sessionStorage.getItem('baseUrl');
          window.location = `${baseUrl}/get-started/finished`;
        }
    })
    .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <div className="checkout">
        <p>Enter your card details:</p>
        <CardElement />
        <button className="btn btn-lg btn-cart" style={{margin: '30px auto 0px'}} onClick={this.submit}>Pay Now</button>
      </div>
    );
  }
}


export default injectStripe(CheckoutForm);