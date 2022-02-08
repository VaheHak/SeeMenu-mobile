import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import arm from '../assets/images/arm.png';
import eng from '../assets/images/eng.png';
import rus from '../assets/images/rus.png';
import { clientRestaurant } from '../store/actions/restaurantsclient';
import { langSelect } from '../store/actions/app';

class LangModal extends Component {
    static propTypes = {
      langSelect: PropTypes.func.isRequired,
      clientRestaurant: PropTypes.func.isRequired,
      close: PropTypes.func.isRequired,
      match: PropTypes.object.isRequired,
    };

    handleChangeLang = (languages) => {
      this.props.langSelect(languages);
      const { restaurantId: id } = this.props.match.params;
      this.props.clientRestaurant(id, languages);
      this.props.close();
    }

    render() {
      return (
        <Modal isOpen overlayClassName="modal1">
          <ul className="icon__block">
            <li onClick={() => this.handleChangeLang('am')}>
              <img src={arm} alt={arm} />
              <span>Հայերեն</span>
            </li>
            <li onClick={() => this.handleChangeLang('en')}>
              <img src={eng} alt={eng} />
              <span>English</span>
            </li>
            <li onClick={() => this.handleChangeLang('ru')}>
              <img src={rus} alt={rus} />
              <span>Русские</span>
            </li>
          </ul>
        </Modal>
      );
    }
}

const mapStateToProps = (state) => ({
  data: state.restaurantsClient.data.result || {},
  lang: state.app.lang,
}
);

const mapDispatchToProps = {
  clientRestaurant,
  langSelect,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LangModal);

export default withRouter(Container);
