import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { oAuthRequest } from '../store/actions/user';

class OAuthGoogleButton extends Component {
  static propTypes = {
    oAuthRequest: PropTypes.func.isRequired,
  }

  responseGoogle = (response) => {
    this.props.oAuthRequest('google', response.accessToken);
  }

  render() {
    return (
      <>
        <GoogleLogin
          clientId="654098226760-3nmk3hbnjnlr5jfonbdr0kiam3q4lmql.apps.googleusercontent.com"
          buttonText=""
          className="my-google-button-class"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </>
    );
  }
}
const mapStateToProps = () => ({});
const mapDispatchToProps = {
  oAuthRequest,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OAuthGoogleButton);
export default Container;
