"use client"
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import Image from 'next/image';

const MyCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Link href="/postagem/postagem01">
          <Image src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/elizabeth.jpg?alt=media&token=e1e420a6-778c-4323-a14f-543e3ffd4418" alt="postagem" width={800} height={400} />
          <Carousel.Caption>
            <h3>Nos Ares de PG!</h3>
            <p>Conferi de perto o salto de paraquedas no evento "Nos Ares de PG 2"!Venha ver aviões, sobrevoos e carros antigos neste fim de semana no Aeroporto Municipal.</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href="/postagem/postagem02">
          <Image src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/elizabeth3.jpg?alt=media&token=6b1ec886-bba7-4a28-a42b-3ae86766122b" alt="postagem1" width={800} height={400} />
          <Carousel.Caption>
            <h3>Bom Domingo!!</h3>
            <p>Visita aos irmãos da Copiosa Redenção #domingo #paz</p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
