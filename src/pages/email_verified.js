import React, { Component } from 'react';
import '../styles/email_verification.css';

class EmailVerified extends Component {

  login = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/login`;
  };

  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'center'}}>
            <h1>Email Verification</h1><br />
            <p>Thank you for verifying your email address with us.</p>
            <p>You may now use your Prosperna Marketplace account. Login and start shopping now.</p>
            <button className="btn btn-primary btn-lg" onClick={this.login}
            style={{margin:'15px auto'}}> LOGIN </button>      
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default EmailVerified;
