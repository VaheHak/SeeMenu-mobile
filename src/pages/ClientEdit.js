import React, { Component } from 'react';
import { ArrowBack } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  chooseUser,
  updateUsersData,
  usersChange,
} from '../store/actions/userclient';
import editUser from '../assets/images/editUser.png';

class ClientEdit extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    updateResult: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    usersChange: PropTypes.func.isRequired,
    updateUsersData: PropTypes.func.isRequired,
    chooseUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.props.chooseUser();
    }
  }

  handleChange = (path, value) => {
    this.props.usersChange(path, value);
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    const { formData } = this.props;

    if (formData.oldPassword && formData.password) {
      if (formData.password === formData.confirmPassword) {
        await this.props.updateUsersData(formData);
      } else {
        this.setState({
          error: 'Wrong repeat password!',
        });
      }
    } else if (!formData.oldPassword && !formData.password) {
      await this.props.updateUsersData(formData);
    }
  };

  handleBlur = () => {
    const { formData } = this.props;
    const { error } = this.state;
    if (formData.confirmPassword === formData.password) {
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
    const {
      formData,
      errors,
      updateResult,
    } = this.props;
    const { error } = this.state;
    return (
      <div className="myProfiles">
        <div className="backBlock">
          <ArrowBack
            className="arrowBack"
            onClick={this.props.history.goBack}
          />
          <div className="editImageBlock">
            <img src={editUser} alt={editUser} />
          </div>
          <form className="namesInputsBlock" onSubmit={this.handleSubmit}>
            <h3>My Profile</h3>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('firstName', ev.target.value)}
                value={formData.firstName}
              />
              <p>{errors?.firstName ? errors.firstName : null}</p>
            </label>
            <label htmlFor="surname">
              Surname
              <input
                type="text"
                id="surname"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('lastName', ev.target.value)}
                value={formData.lastName}
              />
              <p>{errors?.lastName ? errors.lastName : null}</p>
            </label>
            <label htmlFor="phone">
              Phone
              <input
                type="tel"
                id="phone"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('phone', ev.target.value)}
                value={formData.phone}
              />
              <p>{errors?.phone ? errors.phone : null}</p>
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                className="nameTextInputs"
                disabled
                onChange={(ev) => this.handleChange('email', ev.target.value)}
                value={formData.email}
              />
              <p>{errors?.email ? errors.email : null}</p>
            </label>
          </form>
          <hr />
          <form className="passwordInputsBlock" onSubmit={this.handleSubmit}>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('oldPassword', ev.target.value)}
                value={formData.oldPassword}
              />
              <p>{errors?.password ? errors.password : null}</p>
            </label>
            <label htmlFor="newPassword">
              New Password
              <input
                type="password"
                id="newPassword"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('password', ev.target.value)}
                value={formData.password}
              />
              <p>{errors?.newpassword ? errors.newPassword : null}</p>
              <p>{error}</p>
            </label>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                className="nameTextInputs"
                onChange={(ev) => this.handleChange('confirmPassword', ev.target.value)}
                value={formData.confirmPassword}
                onBlur={this.handleBlur}
              />
              <p>{error}</p>
            </label>
            <Snackbar
              open={updateResult.result ? updateResult.result[0] === 1 : false}
              autoHideDuration={5000}
              onClose={this.props.chooseUser}
            >
              <Alert variant="filled" severity="success">
                This account has been successfully updated
              </Alert>
            </Snackbar>
            <Snackbar
              open={updateResult.result ? updateResult.result[0] === 0 : false}
              autoHideDuration={5000}
              onClose={this.props.chooseUser}
            >
              <Alert variant="filled" severity="success">
                Nothing has been updated
              </Alert>
            </Snackbar>
            <div className="buttonBlock">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.userClient.errors,
  formData: state.userClient.formData || {},
  updateResult: state.userClient.updateResult || {},
  token: state.login.token,
  result: state.userClient.result || {},
});

const mapDispatchToProps = {
  updateUsersData,
  usersChange,
  chooseUser,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientEdit);

export default Container;
