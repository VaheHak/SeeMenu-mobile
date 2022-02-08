import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, NavLink, Redirect } from 'react-router-dom';
import {
  Search, ArrowBack, Close, Tune,
} from '@material-ui/icons';
import memoizeOne from 'memoize-one';
import { clientRestaurant } from '../store/actions/restaurantsclient';
import { menusClient, filterClient } from '../store/actions/menusclient';
import { menusItem } from '../store/actions/menusitem';
import FilterSlider from '../components/FilterSlider';
import Wrapper from '../components/Wrapper';
import { langSelect } from '../store/actions/app';
import MenuItem from '../components/MenuItem';

class ClientMenu extends Component {
  static propTypes = {
    menusClient: PropTypes.func.isRequired,
    filterClient: PropTypes.func.isRequired,
    clientRestaurant: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    data: PropTypes.any,
    rest: PropTypes.object.isRequired,
    filter: PropTypes.bool,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    lang: PropTypes.any,
    errors: PropTypes.any,
    err: PropTypes.any,
    restErr: PropTypes.any,
  };

  static defaultProps = {
    lang: '',
    data: {},
    errors: {},
    err: {},
    restErr: {},
    filter: false,
  };

  vegan = memoizeOne(async (vegan) => {
    const { search } = this.state;
    const {
      lang,
      rest,
    } = this.props;
    if (_.isEmpty(rest)) {
      return;
    }
    const categoryId = this.props.match.params.menuId;
    const { restaurantId } = this.props.match.params;
    await this.props.menusClient(lang, restaurantId, rest.branchId, categoryId, search, 1, vegan, '', '');
  }, _.isEqual);

  menu = memoizeOne(async (menu) => {
    if (_.isEmpty(menu)) {
      return;
    }
    const {
      lang,
    } = this.props;
    const {
      search,
      vegan,
    } = this.state;
    const {
      menuId: categoryId,
      restaurantId,
    } = this.props.match.params;
    const id = restaurantId;
    await this.props.clientRestaurant(id, lang);
    await this.props.menusClient(lang, restaurantId, menu.branchId, categoryId, search, 1, vegan, '', '');
  }, _.isEqual);

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      vegan: '',
    };
  }

  handleClick = async (event) => {
    const {
      rest,
      lang,
    } = this.props;
    const { vegan } = this.state;
    const search = event.target?.value || '';
    let categoryId;
    if (typeof event === 'object') {
      categoryId = this.props.match.params.menuId;
    } else {
      categoryId = event;
    }

    const i = rest.categoriesRest.findIndex((c) => c.id === categoryId || c.sourceId === categoryId);
    const prevId = rest.categoriesRest[i - 1];
    const nextId = rest.categoriesRest[i + 1];
    const restaurantId = rest.id;
    this.props.menusClient(lang, restaurantId, rest.branchId, categoryId, search, 1, vegan, '', '');

    if (prevId) {
      this.props.menusClient(lang, restaurantId, rest.branchId, prevId.id, search, 1, vegan, '', '');
      const elmnt = document.getElementById(`list_${prevId.id}`) || document.getElementById(`list_${prevId.sourceId}`);
      elmnt.scrollIntoView();
    }
    if (nextId) {
      this.props.menusClient(lang, restaurantId, rest.branchId, nextId.id, search, 1, vegan, '', '');
      const elmnt = document.getElementById(`list_${nextId.id}`) || document.getElementById(`list_${nextId.sourceId}`);
      elmnt.scrollIntoView();
    }
  };

  filterClick = (bool) => {
    this.props.filterClient(bool);
  };

  handleClose = (ev) => {
    if (ev.target.classList.contains('closeModal')) {
      this.filterClick(false);
    }
  };

  toggleChecked = () => {
    const { vegan } = this.state;
    this.setState({ vegan: vegan === '' ? 0 : '' });
  };

  rateFilter = async (min, max) => {
    const {
      rest,
      lang,
    } = this.props;

    const {
      vegan,
      search,
    } = this.state;
    const categoryId = this.props.match.params.menuId;
    const restaurantId = rest.id;
    await this.props.menusClient(lang, restaurantId, rest.branchId, categoryId, search, 1, vegan, min, max);
  };

  render() {
    const {
      data,
      rest,
      max,
      min,
      filter,
      errors,
      err,
      restErr,
    } = this.props;
    if (restErr?.status && restErr.status === 'ignore' || errors?.status && errors.status === 'ignore'
      || err?.status && err.status === 'ignore') {
      return <Redirect to="/notFound" />;
    }
    const { vegan } = this.state;
    const {
      restaurantId,
      menuId: categoryId,
    } = this.props.match.params;
    this.vegan(vegan);
    this.menu(rest);
    return (

      <Wrapper>
        <div className="wrapper">
          <div className="container">
            <div className="restaurantBlock">
              <div className="restaurantText">
                <h4>{rest.name}</h4>
                <img src={rest.logo} alt="logo" />
              </div>
              <div className="restaurantLogo">
                <p>{rest.subName}</p>
              </div>
            </div>
            <div className="header__menu_row">
              <div className="backBlock">
                <Link to={`/restaurant/${restaurantId}`} className="back__row">
                  <ArrowBack
                    className="arrowBack"
                  />
                </Link>
              </div>

              <div className="searchBlock">
                <input
                  type="search"
                  name="search"
                  placeholder="Search"
                  onChange={this.handleClick}
                />
                <Search className="search" />
              </div>

              <div className="filterBlock">
                <Tune
                  className="filterIcon"
                  onClick={() => this.filterClick(true)}
                />
              </div>
            </div>
            <div
              className={filter ? 'closeModal' : null}
              onClick={this.handleClose}
            >
              <div className={`filtersEmpty ${filter ? '' : 'closFilter'}`}>
                <Close
                  className="closeFilter"
                  onClick={() => this.filterClick(false)}
                />
                <span className="filtersText">Filters</span>
                <div className="priceFilter">
                  <FilterSlider change={this.rateFilter} max={max} min={min} />
                </div>
                <div className="veganBlock">
                  <label htmlFor="all">
                    <input
                      type="radio"
                      id="all"
                      checked={vegan === ''}
                      name="vegan"
                      onChange={this.toggleChecked}
                    />
                    <span>All</span>
                  </label>
                  <label htmlFor="vegan">
                    <input
                      type="radio"
                      id="vegan"
                      name="vegan"
                      checked={vegan === 0}
                      onChange={this.toggleChecked}
                    />
                    <span>Only for vegan</span>
                  </label>
                  <button type="button" className="apply" onClick={() => this.filterClick(false)}>Apply</button>
                </div>
              </div>
            </div>
            <div className="menu__cate">
              <ul>
                {_.map(rest.categoriesRest, (l) => (
                  <li key={l.id} id={`list_${l.sourceId}`}>
                    <NavLink
                      to={`/restaurant/${restaurantId}/menus/${l.sourceId}`}
                      onClick={() => this.handleClick(l.sourceId)}
                    >
                      {l.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu">
              <ul>
                {_.map(data[categoryId], (m) => (
                  <MenuItem
                    key={m.id}
                    item={m}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.menuClients.data,
  errors: state.menuClients.errors,
  filter: state.menuClients.filter,
  rest: state.restaurantsClient.data || {},
  menu: state.menusItem.menu,
  err: state.menusItem.err,
  max: state.menuClients.max,
  min: state.menuClients.min,
  lang: state.app.lang,
  restErr: state.restaurantsClient.errors || {},
});

const mapDispatchToProps = {
  menusClient,
  clientRestaurant,
  menusItem,
  filterClient,
  langSelect,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientMenu);

export default Container;
