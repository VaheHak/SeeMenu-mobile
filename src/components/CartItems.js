import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCount } from '../store/actions/order';

class CartItems extends Component {
  static propTypes = {
    orderData: PropTypes.array.isRequired,
  };

  render() {
    const { orderData } = this.props;
    console.log(orderData);
    return (
      <div />
    );
  }
}

const mapStateToProps = (state) => ({
  orderData: state.order.orderData,
});

const mapDispatchToProps = {
  changeCount,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartItems);

export default Container;
