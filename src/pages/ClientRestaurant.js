import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { menusClient } from '../store/actions/menusclient';
import LangModal from '../components/LangModal';
import Language from '../helpers/storage';
import Wrapper from '../components/Wrapper';
import { langSelect } from '../store/actions/app';

class ClientRestaurant extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.any,
  };

  static defaultProps = {
    errors: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      langOpen: true,
    };
  }

  componentDidMount() {
    const lang = Language.getLang();
    if (!_.isEmpty(lang)) {
      this.setState({ langOpen: false });
    }
    window.addEventListener('scroll', this.handleUpScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleUpScroll);
  }

  handleUpScroll = () => {
    const scroll = window.scrollY;
    if (scroll < 100) {
      this.handleLeftScroll.style.transform = 'rotate(150deg)';
      this.handleRightScroll.style.transform = 'rotate(-150deg)';
    } else {
      this.handleLeftScroll.style.transform = 'rotate(180deg)';
      this.handleRightScroll.style.transform = 'rotate(-180deg)';
    }
  };

  closeLangModal = () => {
    this.setState({ langOpen: false });
  };

  render() {
    const { data, errors } = this.props;
    if (errors?.status && errors.status === 'ignore') {
      return <Redirect to="/notFound" />;
    }
    return (
      <Wrapper>
        <div className="clientRestaurant">
          <div className="container">
            <div className="block__img" key={data.id}>
              <p className="address">{data?.address}</p>
              <p className="phone">{data?.phone}</p>
              <img src={data.logo} alt="logo" className="restLogo" />
              <img
                src={data.cover}
                alt="logo"
                className="homeImg"
              />
              <p className="timing">{data.timing}</p>
            </div>
            <div className="text_block">
              <div className="text_block__top">
                {/* active */}
                <span className="arrowTop ">
                  <span ref={(ref) => this.handleLeftScroll = ref} />
                  <span ref={(ref) => this.handleRightScroll = ref} />
                </span>
                <p className="text">{data.subName}</p>
              </div>
              <ul className="block__item">
                {_.map(data.categoriesRest, (val) => (
                  <Link
                    to={`/restaurant/${data.id}/menus/${val.sourceId}`}
                    key={val.id}
                  >
                    <li>
                      <img src={val.image} alt="qsd" />
                      <p>{val.name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {this.state.langOpen
            ? <LangModal close={this.closeLangModal} /> : null}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.restaurantsClient.data || {},
  categoriesId: state.restaurantsClient.categoriesId || {},
  errors: state.restaurantsClient.errors || {},
  lang: state.app.lang,
});

const mapDispatchToProps = {
  menusClient,
  langSelect,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientRestaurant);

export default Container;
