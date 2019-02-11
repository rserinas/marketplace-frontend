import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTotal, showAlert, fetchNewPrice } from '../actions/checkout.action';
import '../styles/checkout.css';

class Checkout extends Component {
    
    componentDidMount = () => {
        const cart  = JSON.parse(sessionStorage.getItem('cart'));
        let st = 0;
        cart.map((a, i) => {
            st = +st + (+a.price * +a.qty);
        });

        const data = {
            subTotal: st,
            details: cart 
        };
        console.log('Data: ', data);
        this.props.showTotal(data);
    };


    submitNewQty = (i, qty) => {

        const cart  = JSON.parse(sessionStorage.getItem('cart'));

        if (cart[i]) {
            this.props.fetchNewPrice(cart[i], qty, i);
        }
    };


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
            
            return ( 
            <tr key={i}>
                <td>{a.product}</td>
                <td>{a.description}</td>
                <td>
                    <select className="form-control col-lg-3" value={a.qty} 
                    id="" name="" onChange={(e) => this.submitNewQty(i, e.target.value)}>
                        <option value="1">1 yr</option>
                        <option value="2">2 yrs</option>
                        <option value="3">3 yrs</option>
                    </select>
                </td>
                <td align="right">${(a.qty*a.price).toFixed(2)}</td>
            </tr>
            );
        });

        let discount = 0.00;
        if (this.props.trans.discount) {
            discount = this.props.trans.discount.toFixed(2);
        } 

        let total = 0.00;
        if (this.props.trans.total) {
            total = this.props.trans.total.toFixed(2);
        }

    return (
      <React.Fragment>
        <div className="banner">
          <h3 className="banner-header">Order Summary</h3>
          <p className="banner-p">Review Your Order</p>
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
              <div className="step-img" id="third-blue"></div>
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
        <div>
            <div className="col-xs-2 header-label">Customer Name:</div>
            <div className="col-xs-10" style={{marginBottom: '40px'}}>
                <strong>{fname+' '+lname}</strong><br />
                {email}<br />
                {phone}
            </div>
        </div>
        <div className="table-responsive"> 
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
                            <input type="text" className="input-md" placeholder="Enter Promo Code" />
                        </td>
                        <td  className="col-xs-2" align="right">
                            <button className="btn btn-default btn-color btn-lg">Apply</button>
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
                    <tr>
                        <td className="col-xs-7"></td><td></td>
                        <td className="col-xs-5" className="pay-method" colSpan="2">
                            <button className="btn btn-cart btn-lg" onClick={this.gotoPayment}>
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
  
