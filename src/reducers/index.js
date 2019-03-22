import { combineReducers } from 'redux';
import signupReducers from './signup.reducer';
import loginReducers from './login.reducer';
import domainReducers from './domain.reducer';
import checkoutReducers from './checkout.reducer';
import paymentReducers from './payment.reducer';
import domainPanelReducers from './domain_panel.reducer';
import domainContactInfoReducer from './domain_contact_info.reducer';
import domainAuthInfoReducer from './domain_auth_info.reducer';

export default combineReducers({
    signup: signupReducers,
    login: loginReducers,
    domain: domainReducers,
    checkout: checkoutReducers,
    pay: paymentReducers,
    domain_view: domainPanelReducers,
    domain_contact: domainContactInfoReducer,
    domain_auth: domainAuthInfoReducer,
});