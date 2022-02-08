import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import { forgotChange, userForgotPassword } from '../store/actions/login';
import ForgotTextModal from './ForgotTextModal';

class ForgotModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    errors: PropTypes.any,
    userForgotPassword: PropTypes.func.isRequired,
    forgotChange: PropTypes.func.isRequired,
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

  closeClick = () => {
    this.props.onClose();
  };

  handleChange = (path, value) => {
    this.props.forgotChange(path, value);
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    const { formData } = this.props;

    const { payload: { data } } = await this.props.userForgotPassword(formData);

    if (!data.errors && typeof data !== 'string') {
      this.setState({ modalOpen: true });
    }
  };

  render() {
    const {
      formData,
      errors,
    } = this.props;
    const { modalOpen } = this.state;
    return (
      <Modal isOpen overlayClassName="modal2" onRequestClose={this.closeClick}>
        <Close onClick={this.closeClick} className="closeModalOne" />
        <form className="forgotBlock" onSubmit={this.handleSubmit}>
          <h3>Forgot password</h3>
          <label htmlFor="email" className="emailLabel">Enter your email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(ev) => this.handleChange('email', ev.target.value)}
            value={formData.email}
          />
          <p>{errors?.email ? errors.email : null}</p>
          <button type="submit">Send Link</button>
        </form>
        {modalOpen ? (
          <ForgotTextModal
            onClose={this.closeClick}
          />
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  formData: state.login.formData || {},
  errors: state.login.errors,
});

const mapDispatchToProps = {
  userForgotPassword,
  forgotChange,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotModal);
export default Container;
