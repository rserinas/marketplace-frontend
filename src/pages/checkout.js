import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTotal, showAlert, fetchNewPrice } from '../actions/checkout.action';
import '../styles/checkout.css';
import { Row, Col } from 'react-styled-flexboxgrid';
import Progress from '../components/progress';

class Checkout extends Component {
    constructor (props) {
        super (props);
    
        if ( ! sessionStorage.getItem('cart')) {
          const baseUrl = sessionStorage.getItem('baseUrl');
          window.location = `${baseUrl}`;
        }
      }
    
    componentDidMount = () => {
        const cart  = JSON.parse(sessionStorage.getItem('cart'));
        let st = 0;
        cart.map((a, i) => {
            st = +st + +a.price;
        });
        
        let disc = 0;
        if (sessionStorage.getItem('discount')) {
            disc = sessionStorage.getItem('discount')
        }
        sessionStorage.setItem('subTotal', st);
        sessionStorage.setItem('discount', disc);
        sessionStorage.setItem('total', (st - disc));
        
        const data = {
            subTotal: st,
            details: cart 
        };
        
        this.props.showTotal(data);
    };


    // submitNewQty = (i, qty) => {

    //     const cart  = JSON.parse(sessionStorage.getItem('cart'));

    //     if (cart[i]) {
    //         this.props.fetchNewPrice(cart[i], qty, i);
    //     }
    // };


    gotoPayment = () => {
        let baseUrl = sessionStorage.getItem('baseUrl');

        window.location = `${baseUrl}/payment`;
    };


    render() {
        const baseUrl = sessionStorage.getItem('baseUrl');

        const fname = sessionStorage.getItem('fname');
        const lname = sessionStorage.getItem('lname');
        const email = sessionStorage.getItem('email');
        const phone = sessionStorage.getItem('phone');
        const cart  = JSON.parse(sessionStorage.getItem('cart'));

        const viewCart = cart.map((a, i) => {
            let amt = a.price;
            
            return ( 
            <tr key={i}>
                <td>{a.product.charAt(0).toUpperCase() + a.product.slice(1)}</td>
                <td>{a.description}</td>
                <td>
                    { a.product === 'Property Listing Website' ? a.qty + ' month' : a.qty + ' year' }
                    {/* <select className="form-control col-xs-3" value={a.qty} 
                    id="" name="" onChange={(e) => this.submitNewQty(i, e.target.value)}>
                        <option value="1">1 yr</option>
                    </select> */}
                </td>
                <td align="right">${parseFloat(amt).toFixed(2)}</td>
            </tr>
            );
        });

        let discount = 0.00;
        if (this.props.trans.discount) {
            discount = this.props.trans.discount;
        } 

        let total = 0.00;
        if (this.props.trans.total) {
            total = parseFloat(this.props.trans.total).toFixed(2);
        }

        let pesoTotal = 0.00;
        if (this.props.trans.pesoTotal) {
            pesoTotal = parseFloat(this.props.trans.pesoTotal).toFixed(2);
        }

    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Order Summary</h3>
          <p className="banner-p">Review Your Order</p>
          
          <Progress />
        </div>

        <div className="container">
        <div>
            <div className="col-xs-2 header-label">Customer Name:</div>
            <div className="col-xs-10" style={{marginBottom: '40px'}}>
                <strong>{fname+' '+lname}</strong><br />
                {email}<br />
                {phone}
            </div>
        </div>
        <div> 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th width="500">Description</th>
                        <th>Qty</th>
                        <th style={{textAlign:'right'}}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { viewCart }
                </tbody>
            </table>
            <table className="table-sub-total">
                <tbody>
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-3" align="right">
                            <strong>SUB-TOTAL</strong>
                        </td>
                        <td  className="col-xs-2" align="right">
                            ${this.props.trans.subTotal.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-3" align="right">
                            <input type="text" className="form-control" placeholder="Enter Promo Code" />
                        </td>
                        <td  className="col-xs-2" align="right">
                            <button className="btn btn-default btn-color btn-md">Apply</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-3" align="right">
                            <strong>DISCOUNT</strong>
                        </td>
                        <td  className="col-xs-2" align="right">
                            {discount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table-footer">
                <tbody>
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-3" align="right">
                            <strong>TOTAL</strong>
                        </td>
                        <td  className="col-xs-2" align="right">
                            <strong>$ {total}</strong>
                        </td>
                    </tr>
                    {/* <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-3" align="right">
                            <strong>PESO TOTAL</strong>
                        </td>
                        <td  className="col-xs-2" align="right">
                            <strong>₱ {pesoTotal}</strong>
                        </td>
                    </tr> */}
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-5" className="pay-method" colSpan="2">
                            <button className="btn btn-cart btn-md" onClick={this.gotoPayment}>
                                Proceed to Select Payment Method
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



          
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>  {
    return {
      alert: state.checkout.alert,
      trans: state.checkout.trans
    }
  }
  
  const matchDispatchToProps = dispatch => {
    return bindActionCreators({
      showTotal: showTotal,
      showAlert: showAlert,
      fetchNewPrice: fetchNewPrice
    },
    dispatch
    )
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(Checkout);
  
