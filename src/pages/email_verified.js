import React, { Component } from 'react';
import '../styles/email_verification.css';

class EmailVerified extends Component {

  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto'}}>
            <h1>Email Verification</h1>
            <p>Thank you for verifying your email address with us.</p>
            <p>
                You may now use your account to purchase with us{' '}
                <a href={`${baseUrl}/login`}>here</a>.
            </p>      
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default EmailVerified;
