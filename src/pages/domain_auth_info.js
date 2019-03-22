import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, sendAuthInfo } from '../actions/domain_auth_info.action';
import '../styles/domain_auth_info.css';

class DomainAuthInfo extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      auth_info: ''
    };
  }

  setDomain = data => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    sessionStorage.setItem('domain_select', data);
    window.location = `${baseUrl}/domain-panel`;
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

  sendAuthInfo = () => {

    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    if ( ! this.state.auth_info) {
      alert = {
        error: 1,
        msg: 'Domain Auth Info Password is required.',
      };
      return this.props.showAlert(alert);
    } else {

      if (this.state.auth_info.indexOf('&') !== -1) {
        alert = {
          error: 1,
          msg: 'Character & is not allowed.',
        };
        return this.props.showAlert(alert);
      }

      const data = {
        domain: sessionStorage.getItem('domain_select'),
        auth_info: this.state.auth_info
      };
      
      this.props.sendAuthInfo(data);
    }
  };
  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    const domains = sessionStorage.getItem('domains').split(',');
    const ds = sessionStorage.getItem('domain_select');
    
    const showDomainLinks = domains.map((a, i) => {
      return <a key={i} className={(ds === a ? 'domain-link-active ' : '') +'domain-link'} 
      onClick={(e) => {this.setDomain(a)}}>{a}</a>
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
                <a href={`${baseUrl}/domain-panel`} className="side-link">View Domain Details</a>
                <a href={`${baseUrl}/domain/contact-info`} className="side-link">Manage Contact Info</a>
                <a href={`${baseUrl}/domain/auth-info`} className="side-link side-link-active">
                  Manage Domain Auth Info
                </a>
                <a href={`${baseUrl}/domain/auto-renew`} className="side-link">Manage Auto Renew Setting</a>
                <a href={`${baseUrl}/domain/forward-email`} className="side-link">Manage Email Forwarding</a>
                <a href={`${baseUrl}/domain/parkpage`} className="side-link">Manage Parkpage Domain</a>
                <a href={`${baseUrl}/domain/auth-info`} className="side-link">Manage Domain Lock State</a>
                <a href={`${baseUrl}/domain/whois-display`} className="side-link">Manage Whois Display</a>
                <a href={`${baseUrl}/domain/whois-privacy`} className="side-link">Manage Whois Privacy</a>
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
              <h1 className="dont-break-out">Domain Auth Info for {ds}</h1>
              <div className="well">
                <p>Password must be 1 to 32 characters long.</p>
                <p>Must contain at least one number, one letter and one special character.</p>
                <p>Simple phrases and words will be rejected by the registry. </p>
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="auth_info">Domain Auth Info Password</label>
                  <input type="text" id="auth_info" name="auth_info" onChange={this.handleInputChange} 
                  className="form-control input-md" />
                </div>
                <div className="form-group">
                  <button className="btn btn-md btn-primary" 
                  onClick={this.sendAuthInfo}>Save Password</button>
                </div>
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
    alert: state.domain_auth.alert,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    sendAuthInfo: sendAuthInfo,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainAuthInfo);
