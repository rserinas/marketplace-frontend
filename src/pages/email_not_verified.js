import React, { Component } from 'react';
import '../styles/email_verification.css';

class EmailNotVerified extends Component {

  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto'}}>
            <h1>Email Verification</h1>
            <p>
                The email address you are trying to verify is not found or have
                already been verified with us before.
            </p>
            <p>
                You may try to login with us and check{' '}
                <a href={`${baseUrl}login`}>here</a>.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default EmailNotVerified;
