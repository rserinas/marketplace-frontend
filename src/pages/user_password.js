import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, updatePassword } from '../actions/user_password.action';
import { Form ,Col } from 'react-bootstrap';

class UserPassword extends Component {
  constructor (props) {
    super (props);
    this.state = {
      oldpword:    '',
      newpword:    '',
      confpword:    '',
    };
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

  submitRecord = () => {
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
    
    let alert = {};
    let re = null;

    const data = {
      userId:   sessionStorage.getItem('userId'),
      oldpword:    this.state.oldpword,
      newpword:    this.state.newpword,
      confpword:    this.state.confpword
    };

    if ( data.oldpword == null || data.newpword == null || data.confpword == null) {
      alert = {
        error: 1,
        msg: 'Password details are required.',
      };
      return this.props.showAlert(alert);
    }

    let pwd = data.newpword;

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

    if (data.newpword != data.confpword) {
        alert = {
            error: 1,
            msg: 'New Password does not match the confirmation.',
        };
        return this.props.showAlert(alert);
    }
    
    this.props.updatePassword(data);
  };
  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    
    return (
      <React.Fragment>
        <div className="container">
          <div className="nav-domains">
            <div>
              <a href={`${baseUrl}/user-profile`} className="domain-link">View User Profile</a>
            </div>
            <div>
              <a href={`${baseUrl}/user-edit`} className="domain-link ">Edit User Profile</a>
            </div>
            <div className="domain-link-active">
              <a href={`${baseUrl}/user-password`} className="domain-link">Change Password</a>
            </div>
          </div>
          <div className="user-content" style={{clear: 'both'}}>
            <h4 className="dont-break-out">Change User Password</h4>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            <div className="edit-form">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <label className="light">Old Password:</label>
                  </Form.Group>
                  <Form.Group as={Col} md="10" controlId="validationCustom02">
                    <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                    id="oldpword" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <label className="light">New Password:</label>
                  </Form.Group>
                  <Form.Group as={Col} md="10" controlId="validationCustom02">
                    <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                    id="newpword" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <label className="light">Re-enter Password:</label>
                  </Form.Group>
                  <Form.Group as={Col} md="10" controlId="validationCustom02">
                    <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                    id="newpword" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <label className="light" style={{width: "500px"}}>Note: Passwords must be 8-14 characters, contain one letter
                    and at least one number or special character (!@#$%^&amp;*)</label>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <button className="btn btn-primary green" onClick={ this.submitRecord }>
                    Update Password
                    </button>
                  </Form.Group>
                </Form.Row>
              </Form>
              {/* <div className="well col-sm-6">
              <div className="form-group">
                  <label htmlFor="oldpword">Old Password:</label>
                  <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                  id="oldpword" />
                </div>
                <div className="form-group">
                  <label htmlFor="newpword">New Password:</label>
                  <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                  id="newpword" />
                </div>
                <div className="form-group">
                  <label htmlFor="confpword">Re-enter Password:</label>
                  <input type="password" className="form-control input-md" onChange={this.handleInputChange} 
                  id="confpword" />
                  <small>
                  Note: Passwords must be 8-14 characters, contain one letter<br />
                  and at least one number or special character (!@#$%^&amp;*)
                  </small>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg" onClick={ this.submitRecord }>
                  Update Password
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.pass.alert
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    updatePassword: updatePassword,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(UserPassword);
