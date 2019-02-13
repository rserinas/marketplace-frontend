import React, { Component } from 'react';
import '../styles/get_started.css';

class getStarted extends Component {
  
  gotoMarket = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');

    window.location = `${baseUrl}/market-page`;
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="container-md">
            <div className="ellipse-icon"></div>
            <h1>Thank you for your business!</h1>
            <p>Your account is now activated.</p>
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
