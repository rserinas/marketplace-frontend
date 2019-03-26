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
        // window.location = `${baseUrl}/get-started/finished`;
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
    let x = 'It may take 24 - 48 hours for your website namesaver to complete propogation.';
    alert(x);
  };
  
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
