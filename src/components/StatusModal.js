import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteSuccessStatus } from '../store/actions/registration';

class StatusModal extends Component {
  static propTypes = {
    deleteSuccessStatus: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  closeClick = () => {
    this.props.deleteSuccessStatus();
  }

  render() {
    const { status } = this.props;
    return (
      <Modal isOpen overlayClassName="modal3" onRequestClose={this.closeClick}>
        <div className="textBlock">
          <p>{status}</p>
          <button type="button" onClick={this.closeClick} className="okModalOne">OK</button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.registration.status,
});

const mapDispatchToProps = {
  deleteSuccessStatus,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusModal);

export default Container;
