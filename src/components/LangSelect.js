import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import am from '../assets/images/arm.png';
import en from '../assets/images/eng.png';
import ru from '../assets/images/rus.png';

class LangSelect extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    lang: PropTypes.any,
  };

  static defaultProps= {
    lang: '',
  };

  constructor(props) {
    super(props);
    this.lang = [
      { value: 'am', label: 'Հայ' },
      { value: 'ru', label: 'Рус' },
      { value: 'en', label: 'Eng' },
    ];
  }

  handleChange = (ev) => {
    this.props.change(ev.value);
  }

  render() {
    const { lang } = this.props;
    const flags = { am, en, ru };
    return (
      <>
        <Select
          isSearchable={false}
          className="rateSelectBlock"
          classNamePrefix="rate"
          value={this.lang.find((l) => l.value === lang)}
          getOptionLabel={(i) => (
            <div className="langImageBlock">
              <img src={flags[i.value]} alt="flag" className="lang__image" />
              {i.label}
            </div>
          )}
          onChange={this.handleChange}
          options={this.lang}
        />
      </>
    );
  }
}

export default LangSelect;
