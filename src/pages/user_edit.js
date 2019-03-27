import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, fetchProfile, updateUser } from '../actions/user_edit.action';


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

    if ( data.fname == null || data.lname == null || data.address1 == null 
      || data.city == null || data.state == null || data.country == null) {
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
            <a href={`${baseUrl}/user-profile`} className="domain-link">View User Profile</a>
            <a href={`${baseUrl}/user-edit`} className="domain-link domain-link-active">Edit User Profile</a>
            <a href={`${baseUrl}/user-password`} className="domain-link">Change Password</a>
          </div>
          <div style={{clear: 'both'}}>
            <h1 className="dont-break-out">Edit User Profile</h1>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            { ! this.props.rec ? null :
            <div className="container">
              <div className="well col-sm-6">
                <div className="form-group">
                  <label htmlFor="fname">First Name:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.fname} id="fname" />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.lname} id="lname" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone:<br />
                  <small>This phone number will be used to verify your account</small>
                  </label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.phone} id="phone" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.company_name} id="company_name" />
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address 1:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.address1} id="address1" />
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address 2:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.address2} id="address2" />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.country} id="country" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State / Province:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.state} id="state" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.city} id="city" />
                </div>

                <div className="form-group">
                  <label htmlFor="zip">Zip Code:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.rec.zip_code} id="zip_code" />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg" onClick={ this.submitRecord }>
                  Update Profile
                  </button>
                </div>
              </div>
            </div>
            }
            {this.props.alert.error !== 2 ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong style={{fontSize:'150%'}}>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong>
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
