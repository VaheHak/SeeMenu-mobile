import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  ArrowBack, Facebook, Instagram, Twitter,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import seeMenu from '../assets/images/see_menu.png';
import ghost from '../assets/images/ghlogo.png';

class AboutUs extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="aboutUs">
        <div className="backBlock">
          <ArrowBack
            className="arrowBack"
            onClick={this.props.history.goBack}
          />
        </div>
        <div className="menuLogoBlock">
          <img src={seeMenu} alt={seeMenu} />
        </div>
        <div className="ghLogoBlock">
          <div className="aboutBlock">
            <h4>ABOUT US</h4>
            <p>
              gHost Services is a digital design, strategy and development agency.
              We work on all sorts of projects for organizations and businesses from
              the small, local, and boutique to some of the largest companies
              (and brands) in the world
            </p>
            <br />
            <span>Our website:</span>
            <Link to="/"> https://seemenu.am</Link>
          </div>
          <div className="ghostBlock">
            <img src={ghost} alt={ghost} />
          </div>
        </div>
        <div className="iconsBlock">
          <Link to="/"><Facebook className="icon" /></Link>
          <Link to="/"><Instagram className="icon" /></Link>
          <Link to="/"><Twitter className="icon" /></Link>
        </div>
      </div>
    );
  }
}

export default withRouter(AboutUs);
