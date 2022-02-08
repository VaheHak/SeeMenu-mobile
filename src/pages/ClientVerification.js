import React, { Component } from 'react';
import { Cancel, CheckCircleOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActivateRequest } from '../store/actions/login';

class ClientVerification extends Component {
  static propTypes = {
    userActivateRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    const formData = {
      activationCode: this.props.match.params.key,
    };

    const { payload: { data } } = await this.props.userActivateRequest(formData);

    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    const { restaurantId } = this.props.match.params;
    return (
      <div className="verification">
        {data.errors ? (
          <>

            <div className="iconCancelBlock">
              <Cancel
                style={{
                  fontSize: 170,
                  color: 'red',
                }}
              />
            </div>
            <div className="verificationText">
              <span>Sorry, we do not find you in our site!</span>
              <span>Please, register in our site.</span>
              <Link to={`/restaurant/${restaurantId}/registration`}>
                <button type="button" className="verifyButton">REGISTER</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="iconCheckCircleOutlineBlock">
              <CheckCircleOutline
                style={{
                  fontSize: 170,
                  color: 'green',
                }}
              />
            </div>
            <div className="verificationOkText">
              <span>Thanks for verifying your email!</span>
              <Link to={`/restaurant/${restaurantId}/login`}>
                <button type="button" className="verifyButton">LOGIN</button>
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {
  userActivateRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientVerification);

export default Container;
