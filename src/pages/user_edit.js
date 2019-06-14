import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, fetchProfile, updateUser } from '../actions/user_edit.action';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UserEdit extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fname:    '',
      lname:    '',
      phone:    '',
      company_name:  '',
      address1: '',
      address2: '',
      city:     '',
      state:    '',
      country:  '',
      zip_code: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchProfile();
  };
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    
    this.setState({ [name]: value });
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
  }

  submitRecord = (e) => {
    e.preventDefault();
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
    
    let alert = {};
    let re = null;

    const data = {
      userId:   sessionStorage.getItem('userId'),
      fname:    this.state.fname,
      lname:    this.state.lname,
      phone:    this.state.phone,
      company_name:  this.state.company_name,
      address1: this.state.address1,
      address2: this.state.address2,
      city:     this.state.city,
      state:    this.state.state,
      country:  this.state.country,
      zip_code:      this.state.zip_code,
    };

    if ( data.fname == '' || data.lname == '' || data.phone == '' || data.address1 == '' 
      || data.city == '' || data.state == '' || data.country == '' || data.zip_code == '' || data.company_name == '') {
        document.documentElement.scrollTop = 0;
      alert = {
        error: 1,
        msg: 'Customer details are required.',
      };
      return this.props.showAlert(alert);
    }
    
    this.props.updateUser(data);
  };
  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    // if (this.props.rec.fname != undefined) {
    //   this.setTheStates();
    // }
    return (
      <React.Fragment>
        <div className="container">
          <div className="nav-domains">
            <div>
              <a href={`${baseUrl}/user-profile`} className="domain-link">View User Profile</a>
            </div>
            <div className="domain-link-active">
              <a href={`${baseUrl}/user-edit`} className="domain-link">Edit User Profile</a>
            </div>
            <div>
              <a href={`${baseUrl}/user-password`} className="domain-link">Change Password</a>
            </div>
          </div>
          <div className="user-content" style={{clear: 'both'}}>
            <h4 className="dont-break-out">Edit User Profile</h4>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            { ! this.props.rec ? null :
            <div className="edit-form">
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">First Name:</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="fname" />
                    </Form.Group>
                  </Form.Row>
                  
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Last Name:</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="lname" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Phone:</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="phone" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Address 1</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="address1" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Address 2</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="address2" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">City</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="city" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">State</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="state" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Country</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <select className="form-control input-md" id="country" name="country" onChange={this.handleInputChange}>
                        <option value="">Select a country</option>
                        <option value="US">USA</option>
                        <option value="PH">Philippines</option>
                        <option value="AU">Australia</option>
                        <option value="ID">Indonesia</option>
                        <option value="TH">Thailand</option>
                        <option value="MY">Malaysia</option>
                        <option value="SG">Singapore</option>
                        <option value="VN">Vietnam</option>
                        <option value="MM">Myanmar</option>
                        <option value="KH">Cambodia</option>
                        <option value="LA">Laos</option>
                        <option value="BN">Brunei</option>
                        <option value="TL">Timor Leste</option>
                        {/* <option value="other">Other Country</option>               */}
                      </select>
                      {/* <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="country" /> */}
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Postal Code</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="zip_code" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Company:</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <input type="text" className="form-control input-md" onChange={this.handleInputChange} id="company_name" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <button className="btn btn-primary green" onClick={ this.submitRecord.bind(this) }>
                      Update Profile
                      </button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </div>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.edit.alert,
    rec: state.edit.rec,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    fetchProfile: fetchProfile,
    updateUser: updateUser,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(UserEdit);
