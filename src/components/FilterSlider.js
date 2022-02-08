import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import _ from 'lodash';
import memoizeOne from 'memoize-one';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
}));

const classes = useStyles;

class FilterSlider extends Component {
  static propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired,
  };

  maxVale = memoizeOne(async (min, max) => {
    this.setState({
      value: [min, max],
    });
  }, _.isEqual);

  constructor(props) {
    super(props);
    this.state = {
      value: [0, 0],
    };
  }

  handleChange = (ev, value) => {
    this.setState({ value });
  };

  handleFilter = () => {
    const {
      value,
    } = this.state;
    this.props.change(value[0], value[1]);
  };

  minNumber = (num, bool) => {
    const {
      min,
      max,
    } = this.props;
    const { value } = this.state;
    if (bool) {
      const n = value[0];
      if (num <= max && num >= min) {
        this.props.change(n, num);
        this.setState({
          value: [n, num],
        });
      } else {
        this.props.change(n, max);
        this.setState({
          value: [n, max],
        });
      }
    } else {
      const m = value[1];
      if (num >= min && num <= max) {
        this.props.change(num, m);
        this.setState({
          value: [num, m],
        });
      } else {
        this.props.change(min, m);
        this.setState({
          value: [min, m],
        });
      }
    }
  };

  render() {
    const { value } = this.state;
    const {
      min,
      max,
    } = this.props;
    this.maxVale(min, max);
    return (
      <div className={classes.root}>
        <Typography gutterBottom className="range-slider">
          Set max
          price
        </Typography>
        <Slider
          valueLabelDisplay="auto"
          min={min}
          max={max}
          onChange={this.handleChange}
          onChangeCommitted={this.handleFilter}
          value={value}
          aria-labelledby="range-slider"
        />

        <div className="filterInputs">
          <input
            type="number"
            onChange={(ev) => this.minNumber(ev.target.value, false)}
            value={value[0]}
          />
          <input
            type="number"
            onChange={(ev) => this.minNumber(ev.target.value, true)}
            value={value[1]}
          />
        </div>
        <div className={classes.margin} />
      </div>
    );
  }
}

export default FilterSlider;
