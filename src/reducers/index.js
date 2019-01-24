import { combineReducers } from 'redux';
import signupReducers from './signup.reducer';

export default combineReducers({
    signup: signupReducers
});