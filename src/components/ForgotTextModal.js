import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

class ForgotTextModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }

  closeClick = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal isOpen overlayClassName="modal2" onRequestClose={this.closeClick}>
        <div className="modalTextBlock">
          <p className="modalText">
            Thanks, we sent message to your email.
            <br />
            Please check your email!
          </p>
          <button type="button" onClick={this.closeClick} className="closeModalText">OK</button>
        </div>
      </Modal>
    );
  }
}
export default ForgotTextModal;
