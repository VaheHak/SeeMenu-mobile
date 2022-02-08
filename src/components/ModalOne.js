import React, { Component } from 'react';
import Modal from 'react-modal';
import { Close, ZoomIn } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import CountBlock from './CountBlock';
import ImgZoomModal from './ImgZoomModal';
import Default from '../assets/images/default.png';

class ModalOne extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalOpen: false,
    };
  }

  handleRadioChange = (ev, index) => {
    this.setState({
      checkedItem: ev,
      index,
    });
  };

  modalClick = () => {
    this.setState({ modalOpen: true });
  };

  closeClick = () => this.setState({ modalOpen: false });

  render() {
    const {
      data,
      onClose,
    } = this.props;

    const {
      index,
      checkedItem,
    } = this.state;

    const mainType = _.find(data.types, (d) => d.main === 'true');

    return (
      <Modal isOpen overlayClassName="modal" onRequestClose={onClose}>
        <Close onClick={onClose} className="close__modal" />
        <figure className="menu__figure">
          <img src={data.image ? data.image[0] : Default} alt="img" onClick={this.modalClick} />
          <div>
            <ZoomIn onClick={this.modalClick} />
          </div>
        </figure>
        <div className="menuitem__block">
          <h4>{data.name}</h4>
          <p>{data.description}</p>
          <div className="menu__item_block_row">
            <div className="price__block">
              <span>Price:</span>
              <strong>
                {data.price}
                {' '}
                AMD
              </strong>
            </div>
            <div className="vegan__block">
              <span>Vegan:</span>
              <h5>{data.vegan === false ? 'No' : 'Yes'}</h5>
            </div>
          </div>
          <div className="sizeBlock">
            <div>
              {_.map(data.types, (el, ind) => (
                <div key={ind}>
                  <input
                    id={`radio-${ind}`}
                    type="radio"
                    name="radio"
                    value={el.type}
                    checked={checkedItem ? checkedItem === el.type : mainType.type === el.type}
                    onChange={(ev) => this.handleRadioChange(ev.target.value, ind)}
                  />
                  <label htmlFor={`radio-${ind}`}>
                    {' '}
                    {el.type}
                    {' '}
                    {el.price}
                    {' '}
                    AMD
                  </label>
                </div>
              ))}
            </div>
            <CountBlock
              el={index}
              sourceId={data.sourceId}
              data={data}
              itemPrice={data.price}
            />
          </div>
        </div>
        {this.state.modalOpen ? (
          <ImgZoomModal
            onClose={this.closeClick}
          />
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  orderData: state.order.orderData,
});

const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalOne);

export default withRouter(Container);
