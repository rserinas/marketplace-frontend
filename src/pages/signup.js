import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitSignup, acceptTOS, showAlert } from '../actions/signup.action';
import '../styles/signup.css';


class Signup extends Component {
  constructor (props) {
    super (props);
    
    this.state = {
      fname:    '',
      lname:    '',
      email:    '',
      phone:    '',
      pwd:      '',
      confpwd:  '',
      company:  '',
      address1: '',
      address2: '',
      city:     '',
      state:    '',
      country:  '',
      zip:      '',
    };

    this.seeTOS = this.seeTOS.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    
    this.setState({ [name]: value });
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
  }


  seeTOS = (event) => {
    const target = event.target;
    let data = target.checked;

    this.props.acceptTOS(data);
  }

  submitRecord = () => {
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
    
    let alert = {};
    let re = null;

    const data = {
      fname:    this.state.fname,
      lname:    this.state.lname,
      email:    this.state.email,
      phone:    this.state.phone,
      pwd:      this.state.pwd,
      confpwd:  this.state.confpwd,
      company:  this.state.company,
      address1: this.state.address1,
      address2: this.state.address2,
      city:     this.state.city,
      state:    this.state.state,
      country:  this.state.country,
      zip:      this.state.zip,
    };

    if ( ! data.fname || ! data.lname || ! data.email || ! data.address1 
      || ! data.city || ! data.state || ! data.country) {
      alert = {
        error: 1,
        msg: 'Customer details are required.',
      };
      return this.props.showAlert(alert);
    }

    let email = data.email;
    
    // eslint-disable-next-line
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( ! re.test(String(email).toLowerCase())) {
      alert = {
        error: 1,
        msg: 'You need to supply a valid email address.'
      };

      return this.props.showAlert(alert);
    }

    if (data.phone) {

      let phone = data.phone;
      re = /^[+]?[(]?[0-9]{3,5}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      
      if ( ! re.test(phone)) {
        alert = {
          error: 1,
          msg: 'You need to supply a valid phone number.'
        };

        return this.props.showAlert(alert);
      }
    }

    if (data.pwd !== data.confpwd) {
      alert = {
        error: 1,
        msg: 'Password did not match the confirmation password.'
      };

      return this.props.showAlert(alert);
    }

    let pwd = data.pwd;

    if (pwd.length < 8 || pwd.length > 14) {
      alert = {
        error: 1,
        msg: 'Passwords need to be between 8 to 14 characters long only.'
      };

      return this.props.showAlert(alert);
    }

    re = /[a-z]+([0-9]|[!@#$%^&*])+/; 
    
    if ( ! re.test(pwd)) {
      alert = {
        error: 1,
        msg: 'You need to supply a valid password.'
      };

      return this.props.showAlert(alert);
    }
    
    this.props.submitSignup(data);
  };

  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    
    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Create Your Account</h3>
          <p className="banner-p">Already have an Account? <a href={`${baseUrl}/login`}>Log in</a></p>
          <div className="step-container">
            <div className="step-line"></div>
            <div className="step-box">
              <a href={`${baseUrl}/`}>
                <div className="step-img" id="first-blue"></div>
              </a>
              <p className="p-blue">Select Your Apps</p>
            </div>      
            <div className="step-box">
              <a href={`${baseUrl}/signup`}>
                <div className="step-img" id="second-blue"></div>
              </a>
              <p className="p-blue">Create Your Account</p>
            </div>
            { sessionStorage.getItem('cart') && sessionStorage.getItem('userId') ?
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
        </div>

        <div className="container">
          <div style={{ maxWidth: '400px', margin: '20px auto'}}>
            <div className="form-group">
              <label htmlFor="fname">First Name:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.fname} id="fname" />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.lname} id="lname" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:<br />
              <small>This email address will be used so you can log into your account</small>
              </label>
              <input type="email" className="form-control input-md" onChange={this.handleInputChange} 
              value={this.props.record.email} id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:<br />
              <small>This phone number will be used to verify your account</small>
              </label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.phone} id="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
              value={this.props.record.pwd} id="pwd" />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Re-enter Password:</label>
              <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
              value={this.props.record.confpwd} id="confpwd" />
              <small>
              Note: Passwords must be 8-14 characters, contain one letter<br />
              and at least one number or special character (!@#$%^&amp;*)
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="company">Company:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.company} id="company" />
            </div>
            <div className="form-group">
              <label htmlFor="address1">Address 1:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.address1} id="address1" />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.address2} id="address2" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.city} id="city" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.state} id="state" />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.country} id="country" />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code:</label>
              <input type="text" className="form-control input-md" onChange={this.handleInputChange}
              value={this.props.record.zip} id="zip" />
            </div>
            <div className="checkbox">
              <label><input type="checkbox" id="tos" checked={this.props.tos} onChange={ this.seeTOS } /> 
              I accept Prosperna's</label> <a href="/terms-of-service" target="_blank">Terms of Service</a> 
              {' '}&amp; <a href="/privacy-policy" target="_blank">Privacy Policy</a>
            </div>
            <div className="form-group">
              <button id="btn-submit" className={"btn btn-primary btn-md "+(this.props.tos?'':'disabled')} 
              onClick={ this.submitRecord }>
              Create Account
              </button>
            </div>
            {this.props.alert.error !== 2 ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong>
                {this.props.alert.msg}
              </div>
            : ''
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    record: state.signup.record,
    tos: state.signup.btnEnabled,
    alert: state.signup.alert
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    submitSignup: submitSignup,
    acceptTOS: acceptTOS,
    showAlert: showAlert
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
