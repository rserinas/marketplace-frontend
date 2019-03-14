import React, { Component } from 'react';
import '../styles/market_page.css';
import { Row, Col } from 'react-styled-flexboxgrid';

class MarketPage extends Component {
  
  gotoDomain = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/domain-search`;      
  };


  gotoProsperna = () => {
      window.location = `https://www.prosperna.com`;
  };


  gotoBuilder = () => {
      window.location = `https://www.prosperna.com/affordable-real-estate-websites/`;
  };

  gotoLanding = () => {
      window.location = `https://www.prosperna.com/create-real-estate-landing-pages-in-less-than-5-minutes/`;
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


          <Row>
            <Col lg={true} md={true} sm={true} xs={false}>
              <Row center="xs">
                <div className="step-container">
                  <div className="step-line"></div>
                  <Col lg={2} md={2} sm={2} className="step-box">
                    <a href={`${baseUrl}/`}>
                      <div className="step-img" id="first-blue"></div>
                    </a>
                    <p className="p-blue">Select Your Apps</p>
                  </Col>
                  {sessionStorage.getItem('userId') ?
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <a href={`${baseUrl}/signup`}>
                        <div className="step-img" id="second-blue"></div>
                      </a>
                      <p className="p-blue">Create Your Account</p>
                    </Col>
                    :
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <a href={`${baseUrl}/signup`}>
                        <div className="step-img" id="second"></div>
                      </a>
                      <p>Create Your Account</p>
                    </Col>
                  }
                  {sessionStorage.getItem('cart') ?
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <a href={`${baseUrl}/checkout`}>
                        <div className="step-img" id="third-blue"></div>
                      </a>
                      <p className="p-blue">Review Your Order</p>
                    </Col>
                    :
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <div className="step-img" id="third"></div>
                      <p>Review Your Order</p>
                    </Col>
                  }
                  {sessionStorage.getItem('payment') ?
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <a href={`${baseUrl}/payment`}>
                        <div className="step-img" id="fourth-blue"></div>
                      </a>
                      <p className="p-blue">Select Payment Method</p>
                    </Col>
                    :
                    <Col lg={2} md={2} sm={2} className="step-box">
                      <div className="step-img" id="fourth"></div>
                      <p>Select Payment Method</p>
                    </Col>
                  }
                  <Col lg={2} md={2} sm={2} className="step-box">
                    <div className="step-img" id="fifth"></div>
                    <p>Get Started</p>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
          
          <Row>
            <Col lg={false} md={false} sm={false} xs={12} >
              <Row center="xs">
                <div className="step-container">
                  <div className="step-line"></div>
                  <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                    <a href={`${baseUrl}/`}>
                      <div className="step-img" id="first-blue"></div>
                    </a>
                    <p className="p-blue">Select Your Apps</p>
                  </Col>
                  {sessionStorage.getItem('userId') ?
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <a href={`${baseUrl}/signup`}>
                        <div className="step-img" id="second-blue"></div>
                      </a>
                      <p className="p-blue">Create Your Account</p>
                    </Col>
                    :
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <a href={`${baseUrl}/signup`}>
                        <div className="step-img" id="second"></div>
                      </a>
                      <p>Create Your Account</p>
                    </Col>
                  }
                  {sessionStorage.getItem('cart') && sessionStorage.getItem('userId') ?
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <a href={`${baseUrl}/checkout`}>
                        <div className="step-img" id="third-blue"></div>
                      </a>
                      <p className="p-blue">Review Your Order</p>
                    </Col>
                    :
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <div className="step-img" id="third"></div>
                      <p>Review Your Order</p>
                    </Col>
                  }
                  <div className="step-line2"></div>
                  {sessionStorage.getItem('payment') ?
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <a href={`${baseUrl}/payment`}>
                        <div className="step-img" id="fourth-blue"></div>
                      </a>
                      <p className="p-blue">Select Payment Method</p>
                    </Col>
                    :
                    <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                      <div className="step-img" id="fourth"></div>
                      <p>Select Payment Method</p>
                    </Col>
                  }
                  <Col lg={4} md={4} sm={4} xs={4} className="step-box">
                    <div className="step-img" id="fifth"></div>
                    <p>Get Started</p>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="container">
          <Row>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="crm"></div>
                    <h4>CRM</h4>
                    <p className="shop-details">Sell Smarter, Faster &amp; Build Better Relationships.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoProsperna}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="builder"></div>
                    <h4>Website Builder</h4>
                    <p className="shop-details">Affordable Real Estate Websites Fast.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoBuilder}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="landing"></div>
                    <h4>Landing Page Builder</h4>
                    <p className="shop-details">Convert Social Media Traffic to Leads &amp; Signups</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoLanding}>More Info</button> 
                        </div>
                    </div>
                </div>
            </Col>
          </Row>
                {/* Coded By Roevie */}
          <Row >
            <Col md={4} sm={4} xs={12}> 
                <div className="page-box">
                    <div className="shop-icon" id="domain"></div>
                    <h4>Domain Names</h4>
                    <p className="shop-details">Find the perfect domain name.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        
                        <Col className="add-to-cart">
                            <button onClick={this.gotoDomain} 
                            className="shop-btn btn btn-default btn-md">Search Now</button> 
                        </Col>

                    </div>
                </div>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="fb"></div>
                    <h4>Facebook Advertising</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <Col className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </Col>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="google"></div>
                    <h4>Google Advertising</h4>
                    <p className="shop-details">Coming Soon.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <Col className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </Col>
                    </div>
                </div>
            </Col>
          </Row>
             {/* Coded By Roevie */}
          <Row>
            <Col md={4} sm={4} xs={12}>
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
            </Col>
            <Col md={4} sm={4} xs={12}>
                <div className="page-box">
                    <div className="shop-icon" id="bounce"></div>
                    <h4>Never Bounce</h4>
                    <p className="shop-details">Improve Email Deliverability.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoNeverBounce}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={4} xs={12}>
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
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketPage;
