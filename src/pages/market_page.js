import React, { Component } from 'react';
import '../styles/market_page.css';

class MarketPage extends Component {
  
  gotoDomain = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/domain-search`;      
  };


  gotoNeverBounce = () => {
      window.location = `https://neverbounce.com/`;
  };


  gotoContactPage = () => {
    window.location = `https://www.prosperna.com/contact-us/`;      
  };
  
    render() {
        const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Prosperna Marketplace</h3>
          <p className="banner-p">Everything You Need to Sell Smarter, 
          Faster &amp; Build Better Relationships</p>
          <div className="step-container">
            <div className="step-box">
              <a href={`${baseUrl}/`}>
                <div className="step-img" id="first-blue"></div>
              </a>
              <p className="p-blue">Select Your Apps</p>
            </div>
            { sessionStorage.getItem('userId') ? 
              <div className="step-box">
                <a href={`${baseUrl}/signup`}>
                    <div className="step-img" id="second-blue"></div>
                </a>
                <p className="p-blue">Create Your Account</p>
              </div>
            :
              <div className="step-box">
                <a href={`${baseUrl}/signup`}>
                    <div className="step-img" id="second"></div>
                </a>
                <p className="p-blue">Create Your Account</p>
              </div>
            }
            { sessionStorage.getItem('cart') ?
              <div className="step-box">
                <a href={`${baseUrl}/checkout`}>
                  <div className="step-img" id="third-blue"></div>
                </a>
                <p>Review Your Order</p>
              </div>
            :
              <div className="step-box">
                <div className="step-img" id="third"></div>
                <p>Review Your Order</p>
              </div>
            }
            { sessionStorage.getItem('payment') ?
              <div className="step-box">
                <a href={`${baseUrl}/payment`}>
                  <div className="step-img" id="fourth-blue"></div>
                </a>
                <p>Select Payment Method</p>
              </div>
            :
              <div className="step-box">
                <div className="step-img" id="fourth"></div>
                <p>Select Payment Method</p>
              </div>
            }
            <div className="step-box">
              <div className="step-img" id="fifth"></div>
              <p>Get Started</p>
            </div>
            <div className="step-line"></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="crm"></div>
                    <h4>CRM</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"><a href="#" className="info-link">More Info ></a></div>
                        <div className="add-to-cart"><button className="shop-btn btn btn-default btn-md">Add to Cart</button> </div>                   
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="builder"></div>
                    <h4>Website Builder</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"><a href="#" className="info-link">More Info ></a></div>
                        <div className="add-to-cart"><button className="shop-btn btn btn-default btn-md">Add to Cart</button> </div>                   
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="landing"></div>
                    <h4>Landing Page Builder</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"><a href="#" className="info-link">More Info ></a></div>
                        <div className="add-to-cart"><button className="shop-btn btn btn-default btn-md">Add to Cart</button> </div>                   
                    </div>
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="domain"></div>
                    <h4>Domain Name</h4>
                    <p className="shop-details">Find your perfect domain name.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button onClick={this.gotoDomain} 
                            className="shop-btn btn btn-default btn-md">Search</button> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="fb"></div>
                    <h4>Facebook Advertising</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="google"></div>
                    <h4>Google Advertising</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="campaign"></div>
                    <h4>Marketing Automation</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="bounce"></div>
                    <h4>Never Bounce</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoNeverBounce}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="page-box">
                    <div className="shop-icon" id="buynsell"></div>
                    <h4>Buyer's &amp; Seller's Portal</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </div>                   
                    </div>
                </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketPage;
