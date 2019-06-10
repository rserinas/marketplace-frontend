import React, { Component } from 'react';
import '../styles/get_started.css';


class getStarted extends Component {
  
  constructor (props) {
    super (props);
  }

  componentDidMount = () => {
    const apiUrl = sessionStorage.getItem('apiUrl');
    const baseUrl = sessionStorage.getItem('baseUrl');
    const userId = sessionStorage.getItem('userId');
    fetch (`${apiUrl}/domain/list/${userId}`)
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem('domains', data.domain);
        sessionStorage.setItem('domains_list', JSON.stringify(data.domain_list));
    });
    fetch (`${apiUrl}/websites/list/${userId}`)
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem('dev_sites_list',  JSON.stringify(data.dev_site_list));
    });
    // let cart = JSON.parse(sessionStorage.getItem('cart'));
    // console.log('cart:', cart);
    // let hasDomain = false 
    // if (cart != null) {
    //   console.log('inside cart');
    //   hasDomain = cart.map((a, i) => {
    //     console.log('a.product: ', a.product);
    //     if (a.product == 'domain') return true;
    //   });
    //   console.log('hasDomain: ', hasDomain);
    //   if (hasDomain) {
    //     //sessionStorage.removeItem('cart');
    //     let x = 'It may take 24 - 48 hours for your website namesaver to complete propogation.';
    //     alert(x);
    //   }
    // }
    sessionStorage.removeItem('cart');
    // let paymentMethod = sessionStorage.getItem('paymentMethod');
    // let x = 'It may take 24 - 48 hours for your website namesaver to complete propogation.';
    // if(paymentMethod != 'dragonpay')
    // {
    //   alert(x);
    // } 
  };
  
  gotoMarket = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/`;
  };
  gotoMyProducts = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/my-products`;
  };

  render() {
    let paymentMethod = sessionStorage.getItem('paymentMethod');
    return (
      paymentMethod === 'dragonpay' ?
      <React.Fragment>
        <div className="container">
          <div className="container-md">
            <div className="ellipse-icon"></div>
            <h1>Thank you for your business!</h1>
            <p>Our Prosperna Team Tech Support will email you once your payment is completed together with your official receipt.</p>
            <button className="btn btn-primary btn-lg" 
            onClick={ this.gotoMarket }>
                Go Back to Marketplace
            </button>
          </div>
        </div>
      </React.Fragment>
      :
      <React.Fragment>
        <div className="container">
          <div className="container-md">
            <div className="ellipse-icon"></div>
            <h1>Thank you for your business!</h1>
            <p>Our Prosperna Team Tech Support will email your official receipt</p>
            <h5>Click <span><a href="/my-products">here</a></span> to view your purchased products.</h5>
            <button className="btn btn-primary btn-lg m-1" 
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
