import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchContactDetails, showAlert, submitContactInfo } from '../actions/domain_contact_info.action';
import '../styles/domain_contact_info.css';

class DomainContactInfo extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    if ( ! sessionStorage.getItem('domain_select')) {
      let domain_buffer = sessionStorage.getItem('domains').split(',');
      sessionStorage.setItem('domain_select', domain_buffer[0]);
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.checkCountry = this.checkCountry.bind(this);
  }

  componentDidMount = () => {
    const dom = JSON.parse(sessionStorage.getItem('ds'));
    this.props.fetchContactDetails(dom.owner);
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

  submitContactInfo = () => {
    
    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }
    
    let alert = {};
    let re = null;

    const ds = sessionStorage.getItem('domain_select');

    const data = {
      domain:   ds,
      fname:    this.state.fname,
      lname:    this.state.lname,
      email:    this.state.email,
      phone:    this.state.phone,
      fax:      this.state.fax,
      org_name: this.state.org_name,
      address1: this.state.address1,
      address2: this.state.address2,
      address3: this.state.address3,
      city:     this.state.city,
      state:    this.state.state,
      country:  this.state.country,
      zip_code: this.state.zip_code,
      position: this.state.position,
      status:   this.state.status,
    };
console.log(data);
    if ( ! data.fname || ! data.lname || ! data.email || ! data.phone 
      || ! data.address1 || ! data.city || ! data.state || ! data.country) {
      alert = {
        error: 1,
        msg: 'Contact details are required.',
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

    // let phone = data.phone;
    // re = /^[+]?[(]?[0-9]{3,5}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    // if ( ! re.test(phone)) {
    //   alert = {
    //     error: 1,
    //     msg: 'You need to supply a valid phone number.'
    //   };

    //   return this.props.showAlert(alert);
    // }
    
    this.props.submitContactInfo(data);
  };

  setStates = () => {
    this.state = {
      fname:    this.props.dom.fname,
      lname:    this.props.dom.lname,
      email:    this.props.dom.email,
      phone:    this.props.dom.phone,
      fax:      this.props.dom.fax,
      org_name: this.props.dom.org_name,
      address1: this.props.dom.address1,
      address2: this.props.dom.address2,
      address3: this.props.dom.position,
      city:     this.props.dom.city,
      state:    this.props.dom.state,
      country:  this.props.dom.country,
      zip_code: this.props.dom.zip_code,
      position: 'Owner',
      status:   'active'
    };
  };

  setDomain = data => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    sessionStorage.setItem('domain_select', data);
    window.location = `${baseUrl}/domain-panel`;
  };
  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    const domains = sessionStorage.getItem('domains').split(',');
    const ds = sessionStorage.getItem('domain_select');
    
    const showDomainLinks = domains.map((a, i) => {
      return <a key={i} className={(ds === a ? 'domain-link-active ' : '') +'domain-link'} 
      onClick={(e) => {this.setDomain(a)}}>{a}</a>
    });
    
    // const showStates = this.props.country.states.map((e) => {
    //   return <option value={e}>{e}</option>
    // });

    if (this.props.dom) this.setStates();

    return (
      <React.Fragment>
        <div className="container">
          <div className="nav-domains col-xs-12">
            {showDomainLinks}
          </div>
          <div style={{clear: 'both'}}>
            <div className="col-sm-3">
              <div className="nav-side">
                <a href={`${baseUrl}/domain-panel`} className="side-link">View Domain Details</a>
                <a href={`${baseUrl}/domain/contact-info`} className="side-link side-link-active">
                  Manage Contact Info
                </a>
                <a href={`${baseUrl}/domain/auth-info`} className="side-link">Manage Domain Auth Code</a>
                <a href={`${baseUrl}/domain/auto-renew`} className="side-link">Manage Auto Renew Settings</a>
                <a href={`${baseUrl}/domain/parkpage`} className="side-link">Manage Parkpage Domain</a>
                <a href={`${baseUrl}/domain/lock-state`} className="side-link">Manage Domain Lock State</a>
                <a href={`${baseUrl}/domain/whois-privacy`} className="side-link">Manage Whois Privacy</a>
                {/* <a href={`${baseUrl}/domain/renew`} className="side-link">Manage Domain Renewal</a> */}
              </div>
            </div>
            <div className="col-sm-9">
              <h1 className="dont-break-out">Manage Contact Info for {ds}</h1>
              <div className="well form-box">
                <h3>Owner</h3>
                <div className="form-group">
                  <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="fname" onChange={this.handleInputChange} 
                    value={this.props.dom.fname} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="fname">Last Name</label>
                    <input type="text" id="lname" name="lname" onChange={this.handleInputChange} 
                    value={this.props.dom.lname} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="org_name">Organization Name</label>
                    <input type="text" id="org_name" name="org_name" onChange={this.handleInputChange}
                    value={this.props.dom.org_name} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="address3">Position</label>
                    <input type="text" id="address3" name="address3" onChange={this.handleInputChange}
                    value={this.props.dom.position} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={this.handleInputChange}
                    value={this.props.dom.email} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" onChange={this.handleInputChange}
                    value={this.props.dom.phone} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="fax">Fax</label>
                    <input type="text" id="fax" name="fax" onChange={this.handleInputChange}
                    value={this.props.dom.fax} className="form-control input-md" />
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address 1:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.dom.address1} id="address1" name="address1" />
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address 2:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.dom.address2} id="address2" name="address2" />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.dom.city} id="city" name="city" />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State / Province:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                    value={this.props.dom.state} id="state" name="state" />
                  {/* { this.props.country.isDefault ?
                    <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                    value={this.props.dom.state} id="state" />
                    :
                    <select className="form-control input-md" onChange={this.handleInputChange}
                    id="state" name="state">
                      {showStates}
                    </select>
                  } */}
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.dom.country} id="country" name="country" />
                  {/* <select className="form-control input-md" 
                  value={this.props.dom.country}
                  id="country" name="country" onChange={this.checkCountry}>
                    <option value="">Select a country</option>
                    <option value="USA">USA</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Australia">Australia</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Laos">Laos</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Timor Leste">Timor Leste</option>
                    <option value="other">Other Country</option>              
                  </select> */}
                </div>
                <div className="form-group">
                  <label htmlFor="zip">Zip Code:</label>
                  <input type="text" className="form-control input-md" onChange={this.handleInputChange}
                  value={this.props.dom.zip_code} id="zip_code" name="zip_code" />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-md"
                  onClick={this.submitContactInfo}>Update Contact Info</button>
                </div>
              </div>
              {(this.props.alert.error !== 2) ?
                <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                  <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                  {this.props.alert.msg}
                </div>
              : ''
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.domain_contact.alert,
    dom: state.domain_contact.dom,
    // country: state.domain_contact.country
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    fetchContactDetails: fetchContactDetails,
    submitContactInfo: submitContactInfo
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainContactInfo);
