import React, { Component } from 'react';
import { Add, Remove } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { changeCount } from '../store/actions/order';

class CountBlock extends Component {
  static propTypes = {
    el: PropTypes.number.isRequired,
    changeCount: PropTypes.func.isRequired,
    sourceId: PropTypes.number.isRequired,
    itemPrice: PropTypes.number.isRequired,
    orderData: PropTypes.array.isRequired,
  };

  handleChange = (ev) => {
    const {
      itemPrice,
      sourceId,
      el,
    } = this.props;

    this.props.changeCount(+ev.target.value, +itemPrice * +ev.target.value, sourceId, el);
  };

  handleClick = (bool) => {
    const {
      itemPrice,
      sourceId,
      el,
      orderData,
    } = this.props;

    const elem = _.find(orderData, (d) => d.index === el && d.id === sourceId);
    const count = +elem?.count || 0;
    const price = +elem?.price || 0;

    if (bool) {
      this.props.changeCount(count + 1, price + (+itemPrice), sourceId, el);
    } else if (+elem.count - 1 >= 0) {
      this.props.changeCount(count - 1, price - (+itemPrice), sourceId, el);
    } else {
      this.props.changeCount(0, 0, sourceId, el);
    }
  };

  render() {
    const {
      orderData,
      sourceId,
      el,
    } = this.props;

    const elem = _.find(orderData, (d) => d.index === el && d.id === sourceId);

    return (
      <div className="countBlock">
        <div className="countBlockRow">
          <div className="countControlBlock">
            <Remove
              className="minusButton"
              onClick={() => this.handleClick(false)}
            />
            <input
              className="countInput"
              type="number"
              value={elem?.count ? elem.count : 0}
              onChange={this.handleChange}
            />
            <Add
              className="plusButton"
              onClick={() => this.handleClick(true)}
            />
          </div>
          <button
            type="button"
            className="orderButton"
          >
            Add to cart
            {' '}
            {elem?.price ? elem.price : 0}
          </button>
        </div>
      </div>
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
)(CountBlock);

export default withRouter(Container);
