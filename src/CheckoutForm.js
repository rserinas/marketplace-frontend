import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let token = {};
    this.props.stripe.createToken({name: "Name"}).then(({data, error}) => {
      if (error) {
        console.log('Errors: ', error);
      } else {
        token = data;
      }
    });
    console.log('token: ', token);
    let response = await fetch("http://localhost:9000/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    }).catch(err => {
      console.log('error: ', err);
    });
  
    if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);