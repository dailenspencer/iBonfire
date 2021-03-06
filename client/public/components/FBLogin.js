import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { facebookInit, facebookLogin, checkLoginStatus } from '../helpers/fbHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'react-redux';
import * as actions from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.props.facebookLogin();
  }

  componentWillMount() {
    if(this.props.facebook.loggedIn) {
      browserHistory.push('/Home')
    }
  }

  componentDidMount() {
    if(!window.gettingLocation) {
      this.props.getLocation();
    }
  }

  render() {
    return (
      <div id="Login">
        <video  id="bgvid" autoPlay loop muted>
          <source src="../media/Open-Fire/MP4/Open-Fire.mp4" type="video/mp4"/>
          <source src="../media/Open-Fire/WEBM/Open-Fire.webm" type="video/webm"/>
        </video>
        <button id="FacebookLoginButton" type="button" onClick={this.handleLoginClick}>Login</button>
        <div id="Logo">
          <img src="../media/iBonfireLogo.png"/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    markers: state,
    users: state.users,
    location: state.location,
    facebookUser: state.facebook,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, actions)(Login);