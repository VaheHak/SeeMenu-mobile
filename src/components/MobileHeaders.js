import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clientRestaurant } from '../store/actions/restaurantsclient';
import seeMenu from '../assets/images/see_menu.png';
import { langSelect } from '../store/actions/app';
import { menusClient } from '../store/actions/menusclient';
import LangSelect from './LangSelect';

class MobileHeaders extends Component {
  static propTypes = {
    langSelect: PropTypes.func.isRequired,
    clientRestaurant: PropTypes.func.isRequired,
    menusClient: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    lang: PropTypes.any,
    rest: PropTypes.object.isRequired,
  };

  static defaultProps = {
    lang: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { restaurantId: id } = this.props.match.params;
    const { lang } = this.props;
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

  render() {
    const {
      lang,
      rest,
    } = this.props;
    const { restaurantId: id } = this.props.match.params;
    return (
      <div className="mobileHeaders">
        <div className="restaurantName">
          <Link to={`/restaurant/${id}`}>{rest.name}</Link>
        </div>
        <div className="seeMenuLogo">
          <Link to={`/restaurant/${id}`}>
            <img src={seeMenu} alt="seeMenu" />
          </Link>
        </div>
        <div className="languageBlock">
          <LangSelect lang={lang} change={this.handleLang} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lang: state.app.lang,
  rest: state.restaurantsClient.data || {},
});

const mapDispatchToProps = {
  menusClient,
  clientRestaurant,
  langSelect,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobileHeaders);

export default withRouter(Container);
