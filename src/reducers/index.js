import { combineReducers } from 'redux';
import signupReducers from './signup.reducer';
import loginReducers from './login.reducer';
import domainReducers from './domain.reducer';
import checkoutReducers from './checkout.reducer';
import paymentReducers from './payment.reducer';

export default combineReducers({
    signup: signupReducers,
    login: loginReducers,
    domain: domainReducers,
    checkout: checkoutReducers,
    pay: paymentReducers
});