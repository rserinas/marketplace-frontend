import React, { Component } from 'react';
import '../styles/my_products.css';


class myProducts extends Component {
  
  constructor (props) {
    super (props);
  }

  componentDidMount = () => {
    
  };
  
  gotoMarket = () => {
    const baseUrl = sessionStorage.getItem('baseUrl');
    window.location = `${baseUrl}/`;
  };

  render() {
    let paymentMethod = sessionStorage.getItem('paymentMethod');
    return (
      <React.Fragment>
        <section id="my_products">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 header-border">
                        <div>
                            <h2>My Products</h2>
                            <div class="vl"></div>
                            <label>15 purchases</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 no-padding">
                        <div className="purchased-list">
                            <br />
                            <br />
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col" className="product-name">Product Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date Purchased</th>
                                        <th scope="col">Date Expire</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>
                                    <tr>
                                        <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-web-builder.png'} alt="product-web-builder"></img>{'\u00A0'}{'\u00A0'}<p>Prosperna Website Builder</p></td>
                                        <td className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu.</td>
                                        <td className="date-purchased">05-22-2019</td>
                                        <td className="date-expire">05-22-2020</td>
                                        <td className="amount">$100</td>
                                        <td className="actions"><strong>...</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-web-builder.png'} alt="product-web-builder"></img>{'\u00A0'}{'\u00A0'}<p>Prosperna Website Builder</p></td>
                                        <td className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu.</td>
                                        <td className="date-purchased">05-22-2019</td>
                                        <td className="date-expire">05-22-2020</td>
                                        <td className="amount">$100</td>
                                        <td className="actions"><strong>...</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-web-builder.png'} alt="product-web-builder"></img>{'\u00A0'}{'\u00A0'}<p>Prosperna Website Builder</p></td>
                                        <td className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu.</td>
                                        <td className="date-purchased">05-22-2019</td>
                                        <td className="date-expire">05-22-2020</td>
                                        <td className="amount">$100</td>
                                        <td className="actions"><strong>...</strong></td>
                                    </tr>
                                    <tr>
                                        <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-web-builder.png'} alt="product-web-builder"></img>{'\u00A0'}{'\u00A0'}<p>Prosperna Website Builder</p></td>
                                        <td className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididu.</td>
                                        <td className="date-purchased">05-22-2019</td>
                                        <td className="date-expire">05-22-2020</td>
                                        <td className="amount">$100</td>
                                        <td className="actions"><strong>...</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </React.Fragment>
    );
  }
}

export default myProducts;
