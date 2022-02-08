import React, { Component } from 'react';
import { ArrowBack } from '@material-ui/icons';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import _ from 'lodash';
import { Snackbar } from '@material-ui/core';
import login from '../assets/images/log.png';
import OAuthGoogleButton from '../components/OAuthGoogleButton';
import OAuthButtonFacebook from '../components/OAuthFacbookButton';
import ForgotModal from '../components/ForgotModal';
import { loginChange, loginUser } from '../store/actions/login';

class ClientLogin extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    errors: PropTypes.any,
    loginChange: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    deleteStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errors: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleChange = (path, value) => {
    this.props.loginChange(path, value);
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    const { formData } = this.props;

    await this.props.loginUser(formData);
  };

  modalClick = () => {
    this.setState({ modalOpen: true });
  };

  closeClick = () => this.setState({ modalOpen: false });

  render() {
    const { restaurantId } = this.props.match.params;
    const {
      formData,
      token,
      errors,
    } = this.props;
    if (token) {
      return <Redirect to={`/restaurant/${restaurantId}`} />;
    }
    return (
      <div className="clientLogin">
        <div className="backBlock">
          <ArrowBack
            className="arrowBack"
            onClick={this.props.history.goBack}
          />
        </div>
        <div className="loginImageBlock">
          <img src={login} alt={login} />
        </div>
        <form className="loginInputsBlock" onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="loginTextInputs"
            onChange={(ev) => this.handleChange('email', ev.target.value)}
            value={formData.email || ''}
          />
          <p>{errors?.email ? errors.email : null}</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="loginTextInputs"
            onChange={(ev) => this.handleChange('password', ev.target.value)}
            value={formData.password || ''}
          />
          <Snackbar
            open={!_.isEmpty(errors.password)}
            autoHideDuration={5000}
          >
            <Alert onClose={this.props.deleteStatus} variant="filled" severity="error">
              {errors?.password ? errors.password : null}
            </Alert>
          </Snackbar>
          <Snackbar
            open={typeof errors === 'string'}
            autoHideDuration={5000}
          >
            <Alert onClose={this.props.deleteStatus} variant="filled" severity="error">
              {_.isString(errors) ? errors : null}
            </Alert>
          </Snackbar>
          <p className="forgot" onClick={this.modalClick}>Forgot password ?</p>
          <div className="signBlock">
            <span>Dont have an account ?</span>
            <Link to={`/restaurant/${restaurantId}/registration`}>Sign up</Link>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div className="iconsBlock">
          <OAuthGoogleButton />
          <OAuthButtonFacebook />
        </div>
        {this.state.modalOpen ? (
          <ForgotModal
            onClose={this.closeClick}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.login.errors,
  formData: state.login.formData || {},
  errorStatus: state.login.error_status,
  token: state.login.token,
});

const mapDispatchToProps = {
  loginUser,
  loginChange,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientLogin);

export default withRouter(Container);
