import { combineReducers } from 'redux';
import signupReducers from './signup.reducer';
import loginReducers from './login.reducer';
import domainReducers from './domain.reducer';

export default combineReducers({
    signup: signupReducers,
    login: loginReducers,
    domain: domainReducers
});