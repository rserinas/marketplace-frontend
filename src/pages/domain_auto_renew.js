import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, sendAutoRenew } from '../actions/domain_auto_renew.action';


class DomainAutoRenew extends Component {
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

  sendToAutoRenew = () => {

    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    if ((this.state.auto_renew === '0' || this.state.auto_renew === '1') 
    && (this.state.let_expire === '0' || this.state.let_expire === '1')) {
      const data = {
        domain: sessionStorage.getItem('domain_select'),
        auto_renew: this.state.auto_renew,
        let_expire: this.state.let_expire
      };      
      this.props.sendAutoRenew(data);
    
    } else {
      alert = {
        error: 1,
        msg: 'Domain Auto Renew and Let Expire is required.',
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
                <a href={`${baseUrl}/domain/auto-renew`} className="side-link side-link-active">
                  Manage Auto Renew Settings
                </a>
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
              <h1 className="dont-break-out">Domain Auto Renew for {ds}</h1>
              <div className="well col-sm-8">
                
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="auto_renew">Auto Renew your Domain</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="auto_renew" name="auto_renew">
                    <option value="null">Select value</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="let_expire">Let your Domain Expire Silently</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="let_expire" name="let_expire">
                    <option value="null">Select value</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <button className="btn btn-md btn-primary" 
                  onClick={this.sendToAutoRenew}>Save Changes</button>
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
    alert: state.domain_auto_renew.alert,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    sendAutoRenew: sendAutoRenew,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainAutoRenew);
