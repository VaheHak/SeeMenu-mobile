import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { ShoppingCartOutlined } from '@material-ui/icons';
import ModalOne from './ModalOne';
import { menusItem } from '../store/actions/menusitem';
import Default from '../assets/images/default.png';

class MenuItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    rest: PropTypes.object.isRequired,
    menusItem: PropTypes.func.isRequired,
    lang: PropTypes.any,
  };

  static defaultProps = {
    lang: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  modalClick = async () => {
    const {
      rest,
      lang,
      item,
    } = this.props;
    const categoryId = this.props.match.params.menuId;
    const restaurantId = rest.id;
    await this.props.menusItem(item.id, lang, restaurantId, rest.branchId, categoryId);
    this.setState({ modalOpen: true });
  };

  closeClick = () => this.setState({ modalOpen: false });

  render() {
    const { item } = this.props;
    const { modalOpen } = this.state;
    return (
      <>
        <li onClick={this.modalClick}>
          <div className="menu__text_block">
            <img src={item.image ? item.image[0] : Default} alt="sub" />
            <div>
              <p
                className="menu__title"
                title={item.name}
              >
                {_.truncate(item.name, {
                  length: 20,
                  separator: '...',
                })}
              </p>
              <p
                className="menu__text"
                title={item.description}
              >
                {_.truncate(item.description, {
                  length: 50,
                  separator: '...',
                })}
              </p>
              <div className="priceInfoBlock">
                <div className="priceBlock">
                  <span className="price__title">
                    Price
                  </span>
                  <span className="menu__price">
                    {item.price}
                    {' '}
                    AMD
                  </span>
                </div>
                <div className="vegan__Block">
                  <span className="vegan__title">
                    Vegan
                  </span>
                  <span className="menu__vegan">
                    {item.vegan ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

          </div>
          <div className="iconCart">
            <ShoppingCartOutlined />
          </div>
        </li>
        {modalOpen
          ? (
            <ModalOne
              data={item}
              className="createMenuModal"
              onClose={this.closeClick}
            />
          ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  rest: state.restaurantsClient.data || {},
  lang: state.app.lang,
});

const mapDispatchToProps = {
  menusItem,
  // changeCount,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuItem);

export default withRouter(Container);
