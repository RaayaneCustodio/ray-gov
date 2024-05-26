
"use client"
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image1, Image2, Image3 } from '../app/components/svgs/images';


const MyCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image1 />
        <Carousel.Caption>
          <h3>Postagem 1</h3>
          <p>texto 1</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image2 />
        <Carousel.Caption>
          <h3>Postagem 2</h3>
          <p>texto 2</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image3 />
        <Carousel.Caption>
          <h3>Postagem 3</h3>
          <p>texto 3</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;




