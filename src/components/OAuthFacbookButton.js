import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { oAuthRequest } from '../store/actions/user';

class OAuthButtonFacebook extends Component {
  static propTypes = {
    oAuthRequest: PropTypes.func.isRequired,
  }

  responseFacebook = (response) => {
    this.props.oAuthRequest('facebook', response.accessToken);
  }

  render() {
    return (
      <>
        <FacebookLogin
          appId="792380868086843"
          autoLoad
          textButton=""
          fields="name,email"
          cssClass="my-facebook-button-class"
          callback={this.responseFacebook}
          icon="fa-facebook"
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
)(OAuthButtonFacebook);

export default Container;
