import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Headers from './Headers';
import { chooseUser } from '../store/actions/userclient';
import Media from './Media';
import MobileHeaders from './MobileHeaders';
import MobileFooter from './MobileFooter';

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    chooseUser: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.props.chooseUser();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Media screen="mobile">
          <MobileHeaders />
        </Media>
        <Media screen="desktop">
          <Headers />
        </Media>
        {children}
        <Media screen="mobile">
          <MobileFooter />
        </Media>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});
const mapDispatchToProps = {
  chooseUser,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);

export default Container;
