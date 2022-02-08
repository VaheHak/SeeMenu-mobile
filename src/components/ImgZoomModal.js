import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { ZoomOut } from '@material-ui/icons';
import SliderCarousel from './SliderCarousel';

class ImgZoomModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  closeClick = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal isOpen overlayClassName="modal4" onRequestClose={this.closeClick}>
        <SliderCarousel />
        <div>
          <ZoomOut onClick={this.closeClick} />
        </div>
      </Modal>
    );
  }
}

export default ImgZoomModal;
