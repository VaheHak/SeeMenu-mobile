import React, { Component } from 'react';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
  ListOutlined,
  Close, SupervisorAccount, ContactMail, ExitToApp,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clientRestaurant } from '../store/actions/restaurantsclient';
import menu1 from '../assets/images/menu.png';
import { filterClient, menusClient } from '../store/actions/menusclient';
import { chooseUser } from '../store/actions/userclient';
import { deleteToken } from '../store/actions/login';
import CartItems from './CartItems';

class MobileFooter extends Component {
  static propTypes = {
    filterClient: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    deleteToken: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      burger: false,
      cart: false,
    };
  }

  menuClick = (bool) => {
    this.props.filterClient();
    this.setState({
      burger: bool,
    });
  };

  closeMenu = (ev) => {
    if (ev.target.classList.contains('closeModal')) {
      this.menuClick(false);
    }
  };

  logOutClick = async () => {
    this.props.deleteToken();
    this.setState({ burger: false });
  };

  cartClick = () => {
    this.setState({ cart: true });
  };

  closeCart = (ev) => {
    if (ev.target.classList.contains('closeCart')) {
      this.setState({ cart: false });
    }
  };

  render() {
    const {
      token,
    } = this.props;
    const {
      burger,
      cart,
    } = this.state;
    const { restaurantId } = this.props.match.params;
    return (
      <div>
        <div className="footer">
          <div className="iconsBlock">
            <Link to={`/restaurant/${restaurantId}`}>
              <HomeOutlined />
              <p>Home</p>
            </Link>

          </div>

          <div className="iconsBlock" onClick={() => this.cartClick(true)}>
            <ShoppingCartOutlined />
            <p>Cart</p>
          </div>

          <div className="iconsBlock">
            {!token ? (
              <Link
                to={`/restaurant/${restaurantId}/login`}
                className="login"
              >
                <ExitToApp />
                <p>Login</p>
              </Link>
            )
              : (
                <div className="iconsBlock">
                  <Link to={`/restaurant/${restaurantId}/myprofile`}>
                    <PersonOutlineOutlined />
                    <p>Account</p>
                  </Link>
                </div>
              )}
          </div>
          <div className="iconsBlock" onClick={() => this.menuClick(1)}>
            <ListOutlined />
            <p>Menu</p>
          </div>
        </div>
        {cart
          ? (
            <div className="closeCart" onClick={this.closeCart}>
              <div className={cart ? 'openCart' : 'closeIng'}>
                <CartItems />
              </div>
            </div>
          ) : null}

        <div className={burger ? 'closeModal' : null} onClick={this.closeMenu}>
          <div
            className={`menuBurgerEmpty ${burger ? null : 'closing'}`}
            style={{ backgroundImage: `url(${menu1})` }}
          >
            <Close className="closeMenu" onClick={() => this.menuClick(0)} />
            <div>
              <SupervisorAccount />
              <Link to={`/restaurant/${restaurantId}/about`}>About Us</Link>
            </div>
            <div>
              <ContactMail />
              <Link to={`/restaurant/${restaurantId}/contact`}>Contact Us</Link>
            </div>
            <div className="logOut" onClick={this.logOutClick}>
              <ExitToApp />
              <span>LogOut</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.menuClients.data,
  token: state.login.token,
}
);

const mapDispatchToProps = {
  menusClient,
  clientRestaurant,
  filterClient,
  chooseUser,
  deleteToken,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobileFooter);

export default withRouter(Container);
