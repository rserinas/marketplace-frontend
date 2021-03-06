import React, { Component } from 'react';
import '../styles/market_page.css';
import { Row, Col } from 'react-styled-flexboxgrid';
import Progress from '../components/progress';

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

  gotoSignUp = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/signup`;      
  };

  gotoWebBuilder = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `https://marketplace-api.prosperna.ph/web-builder`;      
  };
  
  addToCart = () => {
    let data = {
      product: 'website builder',
      description: 'property listing website',
      ext: 'website_builder',
      qty: 1,
      supplierPrice: 1,
      price: 1
      // supplierPrice: 0.0944,
      // price: 0.0944
    };

    let cart = [];
    let totalCount = 1;
    cart[0] = data;

    sessionStorage.setItem('cartCount', totalCount);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    const baseUrl = sessionStorage.getItem('baseUrl');

    if (sessionStorage.getItem('userId')) {
      window.location = `${baseUrl}/checkout`;
    } else {
      window.location = `${baseUrl}/signup`;
    }
  };

    render() {
        const baseUrl = sessionStorage.getItem('baseUrl');
    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Prosperna Marketplace</h3>
          <p className="banner-p">Everything You Need to Sell Smarter, 
          Faster &amp; Build Better Relationships</p>

          <Progress />
        </div>

        <div className="container">
          <Row>
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="crm"></div>
                    <h4>Prosperna CRM</h4>
                    <p className="shop-details">Sell Smarter, Faster &amp; Build Better Relationships.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoProsperna}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} > 
                <div className="page-box">
                    <div className="shop-icon" id="domain"></div>
                    <h4>Domain Names</h4>
                    <p className="shop-details">Find the perfect domain name to promote your brand online.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        
                        <Col className="add-to-cart">
                            <button onClick={this.gotoDomain} 
                            className="shop-btn btn btn-default btn-md">Search Now</button> 
                        </Col>

                    </div>
                </div>
            </Col>
            
            { sessionStorage.getItem('userId') ? 
              <Col xs={12} sm={6} md={6} lg={4} >
              <div className="page-box">
                  <div className="shop-icon" id="crm"></div>
                  <h4>Prosperna Website Builder</h4>
                  <p className="shop-details">Affordable Real Estate Websites Fast with unlimited support.</p>
                  <div className="shop-box">
                      <div className="more-info">
                        <button className="btn btn-link" onClick={this.gotoBuilder}>More Info >>></button>
                      </div>
                      <div className="add-to-cart">
                          <button className="shop-btn btn btn-default btn-md" onClick={this.addToCart}>Buy Now</button>
                      </div>
                  </div>
              </div>
              </Col>
              :
              <Col xs={12} sm={6} md={6} lg={4} >
              <div className="page-box">
                  <div className="shop-icon" id="crm"></div>
                  <h4>Prosperna Website Builder</h4>
                  <p className="shop-details">Affordable Real Estate Websites Fast with unlimited support.</p>
                  <div className="shop-box">
                      <div className="more-info">
                          <button className="btn btn-link" onClick={this.gotoBuilder}>More Info >>></button>
                      </div>
                      <div className="add-to-cart">
                          <button className="shop-btn btn btn-default btn-md" onClick={this.gotoSignUp}>Buy Now</button>
                      </div>
                  </div>
              </div>
              </Col>
            }
            

                {/* Coded By Roevie */}
 
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="landing"></div>
                    <h4>Landing Page Builder</h4>
                    <p className="shop-details">Convert Social Media Traffic to Leads <br/>&amp; Signups</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoLanding}>More Info</button> 
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="fb"></div>
                    <h4>Facebook Advertising</h4>
                    <p className="shop-details">Grow your audience and generate leads with full-service Facebook advertising.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <Col className="add-to-cart">
                            <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </Col>
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="google"></div>
                    <h4>Google Advertising</h4>
                    <p className="shop-details">Get 1st page Google page rankings, increase traffic and generate leads.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <Col className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </Col>
                    </div>
                </div>
            </Col>

             {/* Coded By Roevie */}

            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="campaign"></div>
                    <h4>Marketing Automation</h4>
                    <p className="shop-details">Coming Soon.<br/><br/></p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoContactPage}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="bounce"></div>
                    <h4>Email Verification Services.</h4>
                    <p className="shop-details">Improve your Email Reputation and Deliverability.</p>
                    <div className="shop-box">
                        <div className="more-info"></div>
                        <div className="add-to-cart">
                        <button className="shop-btn btn btn-default btn-md" onClick={this.gotoNeverBounce}>More Info</button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} >
                <div className="page-box">
                    <div className="shop-icon" id="buynsell"></div>
                    <h4>Buyer's &amp; Seller's Portal</h4>
                    <p className="shop-details">Coming Soon.<br/><br/></p>
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
