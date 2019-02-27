import React, { Component } from 'react';
import '../styles/get_started.css';

class getStarted extends Component {
  constructor() {
    if (sessionStorage.getItem('total')) {
      sessionStorage.removeItem('cartCount');
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('subTotal');
      sessionStorage.removeItem('discount');
      sessionStorage.removeItem('total');
      sessionStorage.removeItem('payment');
      sessionStorage.removeItem('pesoTotal');
      sessionStorage.removeItem('transId');
      sessionStorage.removeItem('paymentUrl');
      sessionStorage.removeItem('extTransId');
    }
  }
  
  gotoMarket = () => {
        
    const baseUrl = sessionStorage.getItem('baseUrl');

    window.location = `${baseUrl}/`;
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="container-md">
            <div className="ellipse-icon"></div>
            <h1>Thank you for your business!</h1>
            <p>Our Prosperna Team Tech Support will email you once your domain has been activated.</p>
            <button className="btn btn-primary btn-lg" 
            onClick={ this.gotoMarket }>
                Go Back to Marketplace
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default getStarted;
