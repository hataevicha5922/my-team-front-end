import { Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import ActionAreaCard from '../TeamCard';

export const Carousel = (data, title) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <>
      <Typography>{title}</Typography>
      <Slider {...settings}>
        {data.map((item) => {
          <ActionAreaCard />;
        })}
      </Slider>
    </>
  );
};
