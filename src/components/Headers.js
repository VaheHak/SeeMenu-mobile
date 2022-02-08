import React, { Component } from 'react';
import {
  Close, ContactMail, Menu, SupervisorAccount, ExitToApp, PersonOutlineOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterClient, menusClient } from '../store/actions/menusclient';
import menu1 from '../assets/images/menu.png';
import LangSelect from './LangSelect';
import seeMenu from '../assets/images/see_menu.png';
import { clientRestaurant } from '../store/actions/restaurantsclient';
import { langSelect } from '../store/actions/app';
import { chooseUser } from '../store/actions/userclient';
import { deleteToken } from '../store/actions/login';

class Headers extends Component {
  static propTypes = {
    langSelect: PropTypes.func.isRequired,
    clientRestaurant: PropTypes.func.isRequired,
    menusClient: PropTypes.func.isRequired,
    filterClient: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    lang: PropTypes.any,
    rest: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    deleteToken: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lang: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      burger: false,
      login: false,
    };
  }

  async componentDidMount() {
    const { lang } = this.props;
    const { restaurantId: id } = this.props.match.params;
    await this.props.clientRestaurant(id, lang);
  }

  handleLang = async (lang) => {
    this.props.langSelect(lang);
    const { rest } = this.props;
    const {
      vegan,
      search,
    } = this.state;

    const categoryId = this.props.match.params.menuId;

    const restaurantId = rest.id;

    const { restaurantId: id } = this.props.match.params;

    if (categoryId) {
      await this.props.menusClient(lang, restaurantId, rest.branchId, categoryId, search, 1, vegan, '', '');
    }
    await this.props.clientRestaurant(id, lang);
  };

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

  handleClick = (ev) => {
    if (ev.target.classList.contains('loginClose')) {
      this.openLoginClick(false);
    }
  };

  openLoginClick = () => {
    const { login } = this.state;
    this.setState({ login: !login });
  };

  logOutClick = async () => {
    this.props.deleteToken();
  };

  render() {
    const {
      burger,
      login,
    } = this.state;
    const {
      lang,
      token,
      result,
      rest,
    } = this.props;
    const { restaurantId } = this.props.match.params;
    return (
      <div className="container">
        <div className="top__block">
          <div className="restaurantName">
            <Link to={`/restaurant/${restaurantId}`}>{rest.name}</Link>
          </div>

          <div className="logoMenu">
            <Link to={`/restaurant/${restaurantId}`}>
              <img src={seeMenu} alt="menuLogo" />
            </Link>
          </div>

          <div className="topMenuBlock">
            <LangSelect lang={lang} change={this.handleLang} />
            <div className="cartBlock">
              <ShoppingCartOutlined />
            </div>

            <div className="usersBlock">
              {!token ? (
                <Link
                  to={`/restaurant/${restaurantId}/login`}
                  className="login"
                >
                  <ExitToApp />
                </Link>
              )
                : (
                  <div
                    className="usersBlockProfile"
                    onClick={() => this.openLoginClick(true)}
                  >
                    <PersonOutlineOutlined />
                    <div
                      className={login ? 'loginClose' : 'closeLogin'}
                      onClick={this.handleClick}
                    >
                      <div className="openLogin">
                        <div className="namesBlock">
                          <span>
                            {result.firstName}
                          </span>
                          <span>
                            {result.lastName}
                          </span>
                        </div>

                        <div className="myProfile">
                          <Link
                            to={`/restaurant/${restaurantId}/myprofile`}
                            className="myProfileLink"
                          >
                            <PersonOutlineOutlined />
                            <span>My Profile</span>
                          </Link>
                        </div>
                        <div className="logOut" onClick={this.logOutClick}>
                          <ExitToApp />
                          <span>LogOut</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <Menu className="menuBurger" onClick={() => this.menuClick(1)} />
          </div>

        </div>

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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.menuClients.data,
  lang: state.app.lang,
  rest: state.restaurantsClient.data || {},
  result: state.userClient.result || {},
  token: state.login.token,
}
);

const mapDispatchToProps = {
  menusClient,
  clientRestaurant,
  filterClient,
  langSelect,
  chooseUser,
  deleteToken,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Headers);

export default withRouter(Container);
