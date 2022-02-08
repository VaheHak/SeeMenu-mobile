import React, { Component } from 'react';
import { ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import contactUs from '../assets/images/contactus.png';
import { contactChange, contactClient } from '../store/actions/contact';
import { clientRestaurant } from '../store/actions/restaurantsclient';

class ContactUs extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    contactChange: PropTypes.func.isRequired,
    clientRestaurant: PropTypes.func.isRequired,
    contactClient: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    await this.props.clientRestaurant(this.props.match.params.restaurantId, 'en');
  }

  handleChange = (path, value) => {
    this.props.contactChange(path, value);
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {
      formData,
      data,
    } = this.props;

    if (data.usersRest) {
      this.props.contactChange('ownerEmail', data.usersRest.email);
    }
    if (data.restManager) {
      this.props.contactChange('managerEmail', data.restManager.email);
    }

    await this.props.contactClient(formData);
  };

  render() {
    const {
      formData,
      errors,
    } = this.props;
    return (
      <div className="contactUs">
        <div className="backBlock">
          <ArrowBack
            className="arrowBack"
            onClick={this.props.history.goBack}
          />
        </div>
        <div className="imageBlock">
          <img src={contactUs} alt={contactUs} />
        </div>
        <form
          className="inputsBlock"
          onSubmit={this.handleSubmit}
        >
          <h3>Contact Us</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="textInputs"
            onChange={(ev) => this.handleChange('name', ev.target.value)}
            value={formData.name || ''}
          />
          <p>{errors?.name ? errors.name : null}</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="textInputs"
            onChange={(ev) => this.handleChange('email', ev.target.value)}
            value={formData.email || ''}
          />
          <p>{errors?.email ? errors.email : null}</p>
          <input
            type="text"
            name="themes"
            placeholder="Subject"
            className="textInputs"
            onChange={(ev) => this.handleChange('themes', ev.target.value)}
            value={formData.themes || ''}
          />
          <p>{errors?.themes ? errors.themes : null}</p>
          <input
            type="text"
            name="message"
            placeholder="Message"
            className="messageInputs"
            onChange={(ev) => this.handleChange('message', ev.target.value)}
            value={formData.message || ''}
          />
          <p>{errors?.message ? errors.message : null}</p>
          <button type="submit" className="contButton">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formData: state.contact.formData || {},
  errors: state.contact.errors || {},
  data: state.restaurantsClient.data || {},
});

const mapDispatchToProps = {
  contactClient,
  contactChange,
  clientRestaurant,
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactUs);

export default withRouter(Container);
