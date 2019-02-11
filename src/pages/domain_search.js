import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitDomain, showAlert, goCheckout } from '../actions/domain_search.action';
import '../styles/domain_search.css';

class DomainSearch extends Component {
  constructor (props) {
    super (props);
    this.state = {
      domainName: '',
      domainExt: '.com'
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

  submitSearch = () => {
    
    this.props.goCheckout(false);

    let alert = {};
    let re = null;

    const data = {
      domainName:    this.state.domainName,
      domainExt:      this.state.domainExt
    };
 
    if ( ! data.domainName || ! data.domainExt) {
      alert = {
        error: 1,
        msg: 'Domain choice is required.',
      };
      return this.props.showAlert(alert);
    }

    const domain = data.domainName + data.domainExt ;

    if (sessionStorage.getItem('cartCount')) {
      JSON.parse(sessionStorage.getItem('cart')).map(a => {
        if (a.description === domain) {
          alert = {
            error: 1,
            msg: 'You can only add another year to your domain on review of your order.'
          };
    
          return this.props.showAlert(alert);  
        }
      });
    }
    
    re = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    
    if ( ! re.test(String(domain).toLowerCase())) {
      alert = {
        error: 1,
        msg: 'You need to supply a valid domain input.'
      };

      return this.props.showAlert(alert);
    }
    
    if ( ! alert.error) {
      this.props.submitDomain(data);
    }

  };


  addToCart = () => {
    let item = this.props.result.domainName + this.props.result.domainExt;
    let data = {
      product: 'domain',
      description: item,
      ext: this.props.result.domainExt,
      qty: 1,
      supplierPrice: this.props.result.supplierPrice,
      price: this.props.result.price.toFixed(2)
    };

    let cart = [];
    let totalCount = 1;
    
    // eslint-disable-next-line
    if (sessionStorage.getItem('cartCount') != null) {
      let buff = JSON.parse(sessionStorage.getItem('cart'));
      cart = buff.slice();
      totalCount = cart.push(data);
    } else {
      cart[0] = data;
    } 
    
    sessionStorage.setItem('cartCount', totalCount);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    this.props.goCheckout(true);
  };

  
  render() {
    const baseUrl = sessionStorage.getItem('baseUrl');
    // eslint-disable-next-line
    const showResults = this.props.result.suggest.map((a, i) => {
      if (this.props.result.count) {
        return <tr key={i}><td>{a.domain}</td><td>{a.status}</td></tr>;
      }
    }); 

    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Domain Search</h3>
          <p className="banner-p">Search the availability of your desired domain</p>
          <div className="step-container">
            <div className="step-box">
              <div className="step-img" id="first-blue"></div>
              <p className="p-blue">Create Your Account</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="second-blue"></div>
              <p className="p-blue">Select Your Apps</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="third"></div>
              <p>Review Your Order</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="fourth"></div>
              <p>Select Payment Method</p>
            </div>
            <div className="step-box">
              <div className="step-img" id="fifth"></div>
              <p>Get Started</p>
            </div>
            <div className="step-line"></div>
          </div>
        </div>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '20px auto'}}>
            <div className="well">
              <h1 style={{marginBottom: '20px'}}>Domain Search:</h1>
              <div className="form-group"style={{marginBottom: '20px'}}>
                <input type="text" className="form-control col-lg-9" 
                onInput={ this.handleInputChange } id="domainName" name="domainName"/>
                <select className="form-control col-lg-3"
                  id="domainExt" name="domainExt" onChange={this.handleInputChange}>
                  <option value=".com">.com</option>
                  <option value=".net">.net</option>
                  <option value=".org">.org</option>
                  <option value=".biz">.biz</option>
                  <option value=".info">.info</option>
                  <option value=".ph">.ph</option>
                  <option value=".com.ph">.com.ph</option>
                  <option value=".co">.co</option>
                  <option value=".us">.us</option>
                </select>
              </div>
              <div className="form-group">
                <button id="btn-submit" className="btn btn-primary btn-color btn-lg" 
                style={{ margin: '20px auto 0px' }} onClick={ this.submitSearch }>
                    Check Availability
                </button>
              </div>
              {this.props.result.has_result ? 
                <div className="domain-banner" >
                  <h3>THIS DOMAIN {' '}
                  {this.props.result.domainName.toUpperCase()}{this.props.result.domainExt.toUpperCase()} 
                  {' '}IS {this.props.result.availability.toUpperCase()}</h3>
                  {this.props.result.availability === 'available' ? 
                    <React.Fragment>
                      <p>Promo Price: ${this.props.result.price.toFixed(2)} / year</p>
                      <button onClick={this.addToCart} className="btn btn-cart btn-lg">
                        Add To Cart
                      </button>
                    </React.Fragment>
                  : 
                    null
                  } 
                </div>
              : 
                null 
              }
              {(this.props.loader) ? 
                <div className="preloader"></div>
              :
                null
              }
              {(this.props.checkout) ?
                <div className="checkout-box">
                  <a href={`${baseUrl}/checkout`} className="checkout-link">Review Your Order</a>
                  <br />
                  <p>Or Continue Searching...</p>
                </div>
              : 
                ''
              }
            </div>
            {(this.props.alert.error !== 2) ?
              <div className={"alert "+(this.props.alert.error===1 ? 'alert-warning' : 'alert-success')}>
                <strong>{(this.props.alert.error===1 ? 'Warning : ' : 'Success : ')}</strong>
                {this.props.alert.msg}
              </div>
            : ''
            }
            {this.props.result.has_result ? 
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Suggestions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    { showResults }
                  </tbody>
                </table>
              </div>
            :
              null
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    alert: state.domain.alert,
    result: state.domain.result,
    loader: state.domain.loader,
    checkout: state.domain.checkout
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    submitDomain: submitDomain,
    showAlert: showAlert,
    goCheckout: goCheckout
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DomainSearch);
