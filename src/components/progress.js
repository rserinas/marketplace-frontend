import React, {Component} from 'react';

class Progress extends Component {
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    let curLocation = window.location;
    console.log(curLocation.href+" "+baseUrl);
    return (
    <div className="step-container">
        { sessionStorage.getItem('userId') ? 
          <div className="step-line" style={{width: '60%'}}></div>
        :
          <div className="step-line"></div>
        }
        <div className="step-box">
          <a href={`${baseUrl}/`}>
            <div className="step-img" id="first-blue"></div>
          </a>
          <p className="p-blue">Select Your Apps</p>
        </div>
        { sessionStorage.getItem('userId') ? 
          // <div className="step-box">
          //   <a href={`${baseUrl}/signup`}>
          //       <div className="step-img" id="second-blue"></div>
          //   </a>
          //   <p className="p-blue">Create Your Account</p>
          // </div>
          ''
        :
          <div className="step-box">
            <a href={`${baseUrl}/signup`}>
                <div className="step-img" id={(curLocation.href === baseUrl+"/signup") ? "second-blue" : 'second'}></div>
            </a>
            <p className={(curLocation.href === baseUrl+"/signup") ? "p-blue" : ''}>Create Your Account</p>
          </div>
        }
        { sessionStorage.getItem('cart') ?
          <div className="step-box">
            <a href={`${baseUrl}/checkout`}>
              <div className="step-img" id="third-blue"></div>
            </a>
            <p className="p-blue">Review Your Order</p>
          </div>
        :
          <div className="step-box">
            <div className="step-img" id="third"></div>
            <p>Review Your Order</p>
          </div>
        }
        { sessionStorage.getItem('payment') ?
          <div className="step-box">
            <a href={`${baseUrl}/payment`}>
              <div className="step-img" id="fourth-blue"></div>
            </a>
            <p className="p-blue">Select Payment Method</p>
          </div>
        :
          <div className="step-box">
            <div className="step-img" id="fourth"></div>
            <p>Select Payment Method</p>
          </div>
        }
        <div className="step-box">
          <div className="step-img" id="fifth"></div>
          <p>Get Started</p>
        </div>
    </div>
    );
  }
}

export default Progress;