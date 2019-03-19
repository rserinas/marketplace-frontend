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
      return <a className={(ds === a ? 'domain-link-active ' : '') +'domain-link'} 
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
                <a href={`${baseUrl}/domain/auth-info`} className="side-link">Manage Domain Auth Info</a>
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
              <h1 className="dont-break-out">Domain Panel for {ds}</h1>
            </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.domain_view.alert
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
