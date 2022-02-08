import React, { Component } from 'react';
import { ArrowBack } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import login from '../assets/images/log.png';
import OAuthGoogleButton from '../components/OAuthGoogleButton';
import OAuthButtonFacebook from '../components/OAuthFacbookButton';
import { registerChange, registerUser } from '../store/actions/registration';
import StatusModal from '../components/StatusModal';

class ClientRegistration extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerChange: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  handleChange = (path, value) => {
    this.props.registerChange(path, value);
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    const { formData } = this.props;
    if (formData.password === formData.repeat) {
      await this.props.registerUser(formData);
    } else {
      this.setState({
        error: 'Wrong repeat password!',
      });
    }
  };

  handleBlur = (ev) => {
    const { formData } = this.props;
    if (formData.password === ev.target.value) {
      this.setState({
        error: '',
      });
    } else {
      this.setState({
        error: 'Wrong repeat password!',
      });
    }
  };

  render() {
    const { error } = this.state;
    const {
      formData,
      errors,
      status,
    } = this.props;
    const { restaurantId } = this.props.match.params;
    return (
      <div className="clientRegistration">
        <div className="backBlock">
          <ArrowBack
            className="arrowBack"
            onClick={this.props.history.goBack}
          />
        </div>
        <div className="registrationImageBlock">
          <img src={login} alt={login} />
        </div>
        <form className="registrationInputsBlock" onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <input
            type="text"
            name="name"
            placeholder="First name"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('firstName', ev.target.value)}
            value={formData.firstName || ''}
          />
          <p>{errors?.firstName ? errors.firstName : null}</p>
          <input
            type="text"
            name="name"
            placeholder="Last name"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('lastName', ev.target.value)}
            value={formData.lastName || ''}
          />
          <p>{errors?.lastName ? errors.lastName : null}</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('email', ev.target.value)}
            value={formData.email || ''}
          />
          <p>{errors?.email ? errors.email : null}</p>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('phone', ev.target.value)}
            value={formData.phone || ''}
          />
          <p>{errors?.phone ? errors.phone : null}</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('password', ev.target.value)}
            value={formData.password || ''}
          />
          <p>{errors?.password ? errors.password : null}</p>
          <input
            type="password"
            name="password"
            placeholder="Confirm password"
            className="registrationTextInputs"
            onChange={(ev) => this.handleChange('repeat', ev.target.value)}
            value={formData.repeat || ''}
            onBlur={this.handleBlur}
          />
          <p>{error}</p>
          <button type="submit">Sign Up</button>
        </form>
        <div className="signInBlock">
          <span>Already have an account ?</span>
          <Link to={`/restaurant/${restaurantId}/login`}>Sign in</Link>
        </div>
        <h4 className="usingText">Create an account using</h4>
        <div className="iconsBlock">
          <OAuthGoogleButton />
          <OAuthButtonFacebook />
        </div>
        {status ? (
          <StatusModal />
        ) : null}
        <Snackbar
          open={typeof errors === 'string'}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="error">
            {errors || null}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formData: state.registration.formData || {},
  errors: state.registration.errors || {},
  status: state.registration.status,
});

const mapDispatchToProps = {
  registerChange,
  registerUser,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientRegistration);

export default Container;
