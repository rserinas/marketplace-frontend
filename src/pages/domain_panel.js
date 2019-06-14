import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDomainDetails, showAlert } from '../actions/domain_panel.action';
import '../styles/domain_panel.css';

class DomainPanel extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    if ( ! sessionStorage.getItem('domain_select')) {
      let domain_buffer = sessionStorage.getItem('domains').split(',');
      sessionStorage.setItem('domain_select', domain_buffer[0]);
    }
  }

  componentDidMount = () => {
    const ds = sessionStorage.getItem('domain_select');
    this.props.fetchDomainDetails(ds);
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
      return <div className={(ds === a ? 'domain-link-active ' : '')}><a key={i} className='domain-link' 
      onClick={(e) => {this.setDomain(a)}}>{a}</a></div> 
    });

    const showServerList = this.props.dom.server == null ? null : this.props.dom.server.map((a, i) => {
      return <tr key={i}><td>{a}</td></tr>
    });

    return (
      <React.Fragment>
        <div className="container">
          <div className="nav-domains col-xs-12">
            {showDomainLinks}
          </div>
          <div style={{clear: 'both'}}>
            <div className="col-sm-3">
              <div className="nav-side">
                <a href={`${baseUrl}/domain-panel`} className="side-link side-link-active">View Domain Details</a>
                <a href={`${baseUrl}/domain/contact-info`} className="side-link">Manage Contact Info</a>
                <a href={`${baseUrl}/domain/auth-info`} className="side-link">Manage Domain Auth Code</a>
                <a href={`${baseUrl}/domain/auto-renew`} className="side-link">Manage Auto Renew Settings</a>
                <a href={`${baseUrl}/domain/parkpage`} className="side-link">Manage Parkpage Domain</a>
                <a href={`${baseUrl}/domain/lock-state`} className="side-link">Manage Domain Lock State</a>
                <a href={`${baseUrl}/domain/whois-privacy`} className="side-link">Manage Whois Privacy</a>
                {/* <a href={`${baseUrl}/domain/renew`} className="side-link">Manage Domain Renewal</a> */}
              </div>
            </div>
            <div className="col-sm-9">
              {(this.props.alert.error !== 2) ?
                <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                  <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong> 
                  {this.props.alert.msg}
                </div>
              : ''
              }
              <h1 className="dont-break-out">Domain Panel for {ds}</h1>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="col-xs-5">Info</th>
                      <th>Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Auto Renew</td>
                      <td>{this.props.dom.auto_renew === '1' ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td>Registry Update Date</td>
                      <td>{this.props.dom.registry_update}</td>
                    </tr>
                    <tr>
                      <td>Registry Create Date</td>
                      <td>{this.props.dom.registry_create}</td>
                    </tr>
                    <tr>
                      <td>Expiry Date</td>
                      <td>{this.props.dom.expiredate}</td>
                    </tr>
                    <tr>
                      <td>Registry Expiry Date</td>
                      <td>{this.props.dom.registry_expire}</td>
                    </tr>
                  </tbody>
                </table>
                { this.props.dom.owner ?
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="2">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-xs-5">First Name</td>
                        <td>{this.props.dom.owner.fname}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{this.props.dom.owner.lname}</td>
                      </tr>
                      <tr>
                        <td>Organization</td>
                        <td>{this.props.dom.owner.org_name}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{this.props.dom.owner.position}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.dom.owner.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{this.props.dom.owner.phone}</td>
                      </tr>
                      <tr>
                        <td>Address 1</td>
                        <td>{this.props.dom.owner.address1}</td>
                      </tr>
                      <tr>
                        <td>Address 2</td>
                        <td>{this.props.dom.owner.address2}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{this.props.dom.owner.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{this.props.dom.owner.state}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{this.props.dom.owner.country}</td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>{this.props.dom.owner.zip_code}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{this.props.dom.owner.status}</td>
                      </tr>                                 
                    </tbody>
                  </table>
                :
                  null
                }
                { this.props.dom.admin ?
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="2">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-xs-5">First Name</td>
                        <td>{this.props.dom.admin.fname}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{this.props.dom.admin.lname}</td>
                      </tr>
                      <tr>
                        <td>Organization</td>
                        <td>{this.props.dom.admin.org_name}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{this.props.dom.admin.position}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.dom.admin.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{this.props.dom.admin.phone}</td>
                      </tr>
                      <tr>
                        <td>Address 1</td>
                        <td>{this.props.dom.admin.address1}</td>
                      </tr>
                      <tr>
                        <td>Address 2</td>
                        <td>{this.props.dom.admin.address2}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{this.props.dom.admin.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{this.props.dom.admin.state}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{this.props.dom.admin.country}</td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>{this.props.dom.admin.zip_code}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{this.props.dom.admin.status}</td>
                      </tr>                                 
                    </tbody>
                  </table>
                :
                  null
                }
                { this.props.dom.tech ?
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="2">Technical</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-xs-5">First Name</td>
                        <td>{this.props.dom.tech.fname}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{this.props.dom.tech.lname}</td>
                      </tr>
                      <tr>
                        <td>Organization</td>
                        <td>{this.props.dom.tech.org_name}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{this.props.dom.tech.position}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.dom.tech.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{this.props.dom.tech.phone}</td>
                      </tr>
                      <tr>
                        <td>Address 1</td>
                        <td>{this.props.dom.tech.address1}</td>
                      </tr>
                      <tr>
                        <td>Address 2</td>
                        <td>{this.props.dom.tech.address2}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{this.props.dom.tech.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{this.props.dom.tech.state}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{this.props.dom.tech.country}</td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>{this.props.dom.tech.zip_code}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{this.props.dom.tech.status}</td>
                      </tr>                                 
                    </tbody>
                  </table>
                :
                  null
                }
                { this.props.dom.billing ?
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="2">Billing</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-xs-5">First Name</td>
                        <td>{this.props.dom.billing.fname}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{this.props.dom.billing.lname}</td>
                      </tr>
                      <tr>
                        <td>Organization</td>
                        <td>{this.props.dom.billing.org_name}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{this.props.dom.billing.position}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.dom.billing.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{this.props.dom.billing.phone}</td>
                      </tr>
                      <tr>
                        <td>Address 1</td>
                        <td>{this.props.dom.billing.address1}</td>
                      </tr>
                      <tr>
                        <td>Address 2</td>
                        <td>{this.props.dom.billing.address2}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{this.props.dom.billing.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{this.props.dom.billing.state}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{this.props.dom.billing.country}</td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>{this.props.dom.billing.zip_code}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{this.props.dom.billing.status}</td>
                      </tr>                                 
                    </tbody>
                  </table>
                :
                  null
                }
                {this.props.dom.server ? 
                  <table className="table table-striped">
                    <thead>
                      <tr><th>Name Server List</th></tr>
                    </thead>
                    <tbody>
                      {showServerList}
                    </tbody>
                  </table>
                :
                  null
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.domain_view.alert,
    dom: state.domain_view.dom
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    fetchDomainDetails: fetchDomainDetails,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainPanel);
