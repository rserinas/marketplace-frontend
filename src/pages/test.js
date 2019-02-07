import React, { Component } from 'react';
// import '../styles/email_verification.css';

class Test extends Component {

  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto'}}>
            <h1>Test Page</h1>
            <p>Thank you for verifying this site.</p>
            <p>
                You may use your account to login with us{' '}
                <a href={`${baseUrl}/login`}>here</a>.
            </p>      
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default Test;
