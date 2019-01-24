import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeName } from '../actions/signup.action';
import '../styles/signup.css';

class Signup extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>This is the signup page, Hello { this.props.name }</h1>
          <button onClick={ (e) => this.props.changeName({name: "Test"}) }>Click Me</button>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>  {
  return {
    name: state.signup.name
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({
    changeName: changeName
  },
  dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
