import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utils from '../helpers/Utils';

class Media extends Component {
  static propTypes = {
    screen: PropTypes.oneOf(['desktop', 'mobile']),
    children: PropTypes.any,
    mobileMaxWidth: PropTypes.number,
  }

  static defaultProps = {
    screen: 'desktop',
    children: null,
    mobileMaxWidth: undefined,
  }

  static pick = (desktop, mobile, mobileMaxWidth) => {
    if (Utils.isMobile(mobileMaxWidth)) {
      return mobile;
    }
    return desktop;
  }

  constructor(props) {
    super(props);
    const { mobileMaxWidth } = this.props;
    this.state = {
      isMobile: Utils.isMobile(mobileMaxWidth),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreen);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreen);
  }

  handleScreen = () => {
    const { mobileMaxWidth } = this.props;
    const { isMobile } = this.state;
    const _isMobile = Utils.isMobile(mobileMaxWidth);
    if (_isMobile !== isMobile) {
      this.setState({ isMobile: _isMobile });
    }
  }

  handleReady = () => {
    const { mobileMaxWidth } = this.props;
    this.setState({ isMobile: Utils.isMobile(mobileMaxWidth) });
  }

  render() {
    const { screen, children } = this.props;
    const { isMobile } = this.state;
    if (!children) {
      return null;
    }
    if ((screen === 'mobile' && isMobile) || (screen === 'desktop' && !isMobile)) {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { key: isMobile ? 'mobile' : 'desktop' });
        }
        return child;
      });
    }
    return null;
  }
}

export default Media;
