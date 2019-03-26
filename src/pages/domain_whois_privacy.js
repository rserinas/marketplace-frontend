import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, sendPrivacyState } from '../actions/domain_whois_privacy.action';


class DomainWhoisPrivacy extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      privacy_state: ''
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

  sendWhois = () => {

    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    if (this.state.privacy_state === 'enable' || this.state.privacy_state === 'disable') {
      const data = {
        domain: sessionStorage.getItem('domain_select'),
        privacy_state: this.state.privacy_state
      };
      
      this.props.sendPrivacyState(data);

    } else {
      alert = {
        error: 1,
        msg: 'Whois Privacy State is required.',
      };

      return this.props.showAlert(alert);
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
                <a href={`${baseUrl}/domain/auth-info`} className="side-link">Manage Domain Auth Code</a>
                <a href={`${baseUrl}/domain/auto-renew`} className="side-link">Manage Auto Renew Settings</a>
                <a href={`${baseUrl}/domain/parkpage`} className="side-link">Manage Parkpage Domain</a>
                <a href={`${baseUrl}/domain/lock-state`} className="side-link">Manage Domain Lock State</a>
                <a href={`${baseUrl}/domain/whois-privacy`} className="side-link side-link-active">
                  Manage Whois Privacy
                </a>
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
              <h1 className="dont-break-out">Domain Whois Privacy for {ds}</h1>
              <div className="well col-sm-8">
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="privacy_state">Domain Whois Privacy State</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="privacy_state" name="privacy_state">
                    <option value="null">Select value</option>
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                  </select>
                </div>
                <div className="form-group">
                  <button className="btn btn-md btn-primary" 
                  onClick={this.sendWhois}>Update Changes</button>
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
    alert: state.domain_whois.alert,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    sendPrivacyState: sendPrivacyState,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainWhoisPrivacy);
