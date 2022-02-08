import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import arm from '../assets/images/arm.png';
import eng from '../assets/images/eng.png';
import rus from '../assets/images/rus.png';

class SliderCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (

      <Slider {...settings}>
        <figure>
          <img src={arm} alt="img" />
        </figure>
        <figure>
          <img src={rus} alt="img" />
        </figure>
        <figure>
          <img src={eng} alt="img" />
        </figure>
      </Slider>
    );
  }
}

export default SliderCarousel;
