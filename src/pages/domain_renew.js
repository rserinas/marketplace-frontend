import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, sendDomainRenew } from '../actions/domain_renew.action';


class DomainRenew extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    
    this.handleInputChange = this.handleInputChange.bind(this);
    
    let buffer = JSON.parse(sessionStorage.getItem('ds'));
    let xpdate = buffer.registry_expire;
    
    this.state = {
      auto_renew: '',
      park_page: '',
      xpyear: xpdate.substring(0,4),
      period: '',
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

  sendRenew = () => {

    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    if ((this.state.auto_renew === '0' || this.state.auto_renew === '1') 
    && (this.state.park_page === 'Y' || this.state.park_page === 'N') 
    && (this.state.period > 0 && this.state.period < 11)) {
      const data = {
            auto_renew: this.state.auto_renew,
            park_page: this.state.park_page,
            domain: sessionStorage.getItem('domain_select'),
            xpyear: this.state.xpyear,
            period: this.state.period
      };      
      this.props.sendDomainRenew(data);
    
    } else {
      alert = {
        error: 1,
        msg: 'Domain Renew Details are required.',
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
                <a href={`${baseUrl}/domain/whois-privacy`} className="side-link">Manage Whois Privacy</a>
                <a href={`${baseUrl}/domain/renew`} className="side-link side-link-active">
                  Manage Domain Renewal
                </a>
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
              <h1 className="dont-break-out">Domain Renewal for {ds}</h1>
              <div className="well col-sm-8">
                
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="auto_renew">Auto Renew your Domain?</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="auto_renew" name="auto_renew">
                    <option value="null">Select value</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="park_page">Parked Domain?</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="park_page" name="park_page">
                    <option value="null">Select value</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>

                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="period">Number of Years to Renew?</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="period" name="period">
                    <option value="null">Select value</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="form-group">
                  <button className="btn btn-md btn-primary" 
                  onClick={this.sendRenew}>Renew Domain</button>
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
    dom: state.domain_renew.dom,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    sendDomainRenew: sendDomainRenew,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainRenew);
