import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, sendParkInfo } from '../actions/domain_parkpage.action';

class DomainParkPage extends Component {
  constructor (props) {
    super (props);
    const baseUrl = sessionStorage.getItem('baseUrl');
    if ( ! sessionStorage.getItem('domains')) window.location = `${baseUrl}`;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      parkState: ''
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

  sendParkState = () => {

    if (this.props.alert.error !== 2) {
      this.props.showAlert({ error: 2, msg: '' });
    }

    if ( ! this.state.parkState) {
      alert = {
        error: 1,
        msg: 'Park Page State is required.',
      };
      return this.props.showAlert(alert);
    } else {
      const data = {
        domain: sessionStorage.getItem('domain_select'),
        parkState: this.state.parkState
      };
      
      this.props.sendParkInfo(data);
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
                <a href={`${baseUrl}/domain/parkpage`} className="side-link side-link-active">
                  Manage Parkpage Domain
                </a>
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
              <h1 className="dont-break-out">Domain Parkpage State for {ds}</h1>
              <div className="well col-sm-8">
                <div className="form-group" style={{marginTop: '25px'}}>
                  <label htmlFor="parkState">Enable Parked Pages</label>
                  <select className="form-control input-md" onChange={this.handleInputChange}
                  id="parkState" name="parkState">
                    <option value="null">Select value</option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="form-group">
                  <button className="btn btn-md btn-primary" 
                  onClick={this.sendParkState}>Update Changes</button>
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
    alert: state.domain_park.alert,
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    showAlert: showAlert,
    sendParkInfo: sendParkInfo,
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainParkPage);
