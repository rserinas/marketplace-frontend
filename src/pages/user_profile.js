import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, fetchProfile } from '../actions/user_profile.action';


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
            <a href={`${baseUrl}/user-profile`} className="domain-link domain-link-active">
              View User Profile
            </a>
            <a href={`${baseUrl}/user-edit`} className="domain-link">Edit User Profile</a>
            <a href={`${baseUrl}/user-password`} className="domain-link">Change Password</a>
          </div>
          <div style={{clear: 'both'}}>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                {this.props.alert.msg}
              </div>
            : ''
            }
            <h1 className="dont-break-out">User Profile</h1>
            { ! this.props.rec ? null :
              <table className="table table-striped col-sm-6">
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Email</td>
                    <td>{this.props.rec.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{this.props.rec.phone}</td>
                  </tr>
                  <tr>
                    <td>First Name</td>
                    <td>{this.props.rec.fname}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{this.props.rec.lname}</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>{this.props.rec.company_name}</td>
                  </tr>
                  <tr>
                    <td>Address 1</td>
                    <td>{this.props.rec.address1}</td>
                  </tr>
                  <tr>
                    <td>Address 2</td>
                    <td>{this.props.rec.address2}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{this.props.rec.city}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{this.props.rec.state}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{this.props.rec.country}</td>
                  </tr>
                  <tr>
                    <td>Postal Code</td>
                    <td>{this.props.rec.zip_code}</td>
                  </tr>
                  <tr>
                    <td>Date Created</td>
                    <td>{this.props.rec.created_at}</td>
                  </tr>
                  <tr>
                    <td>Date Updated</td>
                    <td>{this.props.rec.updated_at}</td>
                  </tr>
                  <tr>
                    <td>User Status</td>
                    <td>{this.props.rec.status_name}</td>
                  </tr>
                </tbody>
              </table>
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
