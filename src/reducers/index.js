import { combineReducers } from 'redux';
import signupReducers from './signup.reducer';
import loginReducers from './login.reducer';

export default combineReducers({
    signup: signupReducers,
    login: loginReducers
});