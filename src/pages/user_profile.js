import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, fetchProfile } from '../actions/user_profile.action';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class UserProfile extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount = () => {
    this.props.fetchProfile();
  };
  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');

    return (
      <React.Fragment>
        <div className="container">
          <div className="nav-domains">
            <div className="domain-link-active">
              <a href={`${baseUrl}/user-profile`} className="domain-link">
                View User Profile
              </a>
            </div>
            <div>
              <a href={`${baseUrl}/user-edit`} className="domain-link">Edit User Profile</a>
            </div>
            <div>
              <a href={`${baseUrl}/user-password`} className="domain-link">Change Password</a>
            </div>
          </div>
          <div className="user-content" style={{clear: 'both'}}>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            <h4 className="dont-break-out">User Profile</h4>
            { ! this.props.rec ? null :
              <>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">First Name</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.fname === "" ? 'None' : this.props.rec.fname}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Last Name</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.lname === "" ? 'None' : this.props.rec.lname}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">User Status</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.status_name === "" ? 'None' :this.props.rec.status_name}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Email</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.email === "" ? 'None' : this.props.rec.email}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Phone</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.phone === "" ? 'None' : this.props.rec.phone}</label>
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
                      <label className="dark">{this.props.rec.address1 === "" ? 'None' : this.props.rec.address1}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Address 2</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.address2 === "" ? 'None' : this.props.rec.address2}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">City</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.city === "" ? 'None' : this.props.rec.city}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">State</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.state === "" ? 'None' : this.props.rec.state}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Country</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.country === "" ? 'None' : this.props.rec.country}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Postal Code</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.zip_code === "" ? 'None' : this.props.rec.zip_code}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Company Name</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.company_name === "" ? 'None' : this.props.rec.company_name}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <hr/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Date Created</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.created_at === "" ? 'None' : this.props.rec.created_at}</label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <label className="light">Date Updated</label>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <label className="dark">{this.props.rec.updated_at === "" ? 'None' : this.props.rec.updated_at}</label>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.profile.alert,
    rec: state.profile.rec,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    fetchProfile: fetchProfile,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);
