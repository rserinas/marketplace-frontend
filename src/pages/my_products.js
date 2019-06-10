import React, { Component } from 'react';
import '../styles/my_products.css';
import axios from 'axios';
import _ from 'lodash';
import ReactDOM from 'react-dom';

class myProducts extends Component {
  
    constructor (props) {
        super (props);
        this.state = {
            category: 'domains',
            isDomains: false,
            isDevSites: false,
            devsites: [],
            domains: [],
            isLoading: true
        }
    }

    httpFirst = (apiUrl, userId) => {
        return axios.get(`${apiUrl}/domain/list/${userId}`);
    }

    httpSecond = (apiUrl, userId) => {
        return axios.get(`${apiUrl}/websites/list/${userId}`);
    }
    
    componentWillMount = () => {
        sessionStorage.removeItem('domains_list');
        sessionStorage.removeItem('dev_sites_list');
        const apiUrl = sessionStorage.getItem('apiUrl');
        const baseUrl = sessionStorage.getItem('baseUrl');
        const userId = sessionStorage.getItem('userId');

        this.httpFirst(apiUrl, userId)
        .then((responseFirst) => {
            this.httpSecond(apiUrl, userId)
            .then((responseSecond) => {
                // sessionStorage.setItem('domains', responseFirst.data.domain);
                // sessionStorage.setItem('domains_list', JSON.stringify(responseFirst.data.domain_list));
                // sessionStorage.setItem('dev_sites_list',  JSON.stringify(responseSecond.data.dev_site_list));
                //console.log(sessionStorage.getItem('domains_list'));
                
                if(responseFirst.data.domain_list != undefined || responseFirst.data.domain_list != null){
                    this.setState({
                        domains: responseFirst.data.domain_list,
                    })
                }
                if(responseSecond.data.dev_site_list != undefined || responseSecond.data.dev_site_list != null){
                    this.setState({
                        devsites: responseSecond.data.dev_site_list,
                    })
                }
                
            })
        })
        .catch((error) => {
            console.log(error);
        })
   
    }
    gotoMarket = () => {
        const baseUrl = sessionStorage.getItem('baseUrl');
        window.location = `${baseUrl}/`;
    };
    gotoWebBuilder = () => {
        const userId = sessionStorage.getItem('userId');
        const baseUrl = sessionStorage.getItem('baseUrl');
        const webBuilderApiUrl = sessionStorage.getItem('webBuilderApiUrl');
        window.location = `${webBuilderApiUrl}/api/?id=${userId}&base_url=${baseUrl}`;
    };
    gotoDomainPanel = () => {
        const baseUrl = sessionStorage.getItem('baseUrl');
        window.location = `${baseUrl}/domain-panel`;
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log("waw "+this.state.isLoading);
    }
    
    render() {
        let paymentMethod = sessionStorage.getItem('paymentMethod');
        const purchasedCount = this.state.category === "domains" ? this.state.domains.length : this.state.category === "dev_sites" ? this.state.devsites.length : 0;
        const showDomains = this.state.domains.map((val, index) => {
            return(
                <tr>
                    <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-domain-name.png'} alt="product-domain-name"></img>{'\u00A0'}{'\u00A0'}<p>Domain Name</p></td>
                    <td className="description">Domain Name: {val.domain_name}</td>
                    <td className="date-purchased">05-22-2019</td>
                    <td className="date-expire">05-22-2020</td>
                    <td className="amount">${val.total_price}</td>
                    <td className="actions">
                        <div className="dropdown">
                            <strong data-toggle="dropdown">...</strong>
                            <ul className="dropdown-menu">
                                <li onClick={this.gotoDomainPanel}><a>Go to Domain Panel</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            );
        })
        const showDevsites = this.state.devsites.map((val, index) => {
            return(
                <tr>
                    <td className="product-name"><img src={process.env.PUBLIC_URL + '/product-web-builder.png'} alt="product-web-builder"></img>{'\u00A0'}{'\u00A0'}<p>Website Builder</p></td>
                    <td className="description">Theme: Property Listing Website</td>
                    <td className="date-purchased">05-22-2019</td>
                    <td className="date-expire">05-22-2020</td>
                    <td className="amount">${val.total_price}</td>
                    <td className="actions">
                        <div className="dropdown">
                            <strong data-toggle="dropdown">...</strong>
                            <ul className="dropdown-menu">
                                <li>
                                    {
                                        val.website_name === 'not_created' ?
                                            <a onClick={this.gotoWebBuilder}>Create Now</a>
                                        :
                                            <a href={"https://"+val.website_name} target="_blank">Go to your Website</a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            );
        })
        return (
            <React.Fragment>
                <section id="my_products">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 header-border">
                                <div>
                                    <h2>My Products</h2>
                                    <div className="vl"></div>
                                    <label>{purchasedCount} {purchasedCount > 1 ? 'purchases' : 'purchase'}</label>
                                    <div className="select-category">
                                        <h4>Category:</h4>
                                        <select name="category" onChange={this.onChange.bind(this)}>
                                            <option value="domains">Domain Names</option>
                                            <option value="dev_sites">Website Builder</option>
                                        </select>
                                        
                                        {/* <select>
                                            <option value="grapefruit">Grapefruit</option>
                                            <option value="lime">Lime</option>
                                            <option selected value="coconut">Coconut</option>
                                            <option value="mango">Mango</option>
                                        </select> */}
                                    </div>
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
                                        <tbody id="table-body">
                                            {this.state.category === "domains" ? showDomains : this.state.category === "dev_sites" ? showDevsites : ''}
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
