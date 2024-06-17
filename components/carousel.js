
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
          <Image src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/elizabeth.jpg?alt=media&token=e1e420a6-778c-4323-a14f-543e3ffd4418" alt='postagem' width={800} height={400} />
          <Carousel.Caption>
            <h3>✈ Nos Ares de PG! ✈
            </h3>
            <p>Conferi  de perto o salto de paraquedas no evento "Nos Ares de PG 2"! 🎉🪂

              Venha ver aviões, sobrevoos e carros antigos neste fim de semana no Aeroporto Municipal. 🚁🚒✨
            </p>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link href="/postagem/postagem02">
        <Image src="https://firebasestorage.googleapis.com/v0/b/compartilhai.appspot.com/o/elizabeth3.jpg?alt=media&token=6b1ec886-bba7-4a28-a42b-3ae86766122b" alt='postagem1' width={800} height={400} />
        <Carousel.Caption>
          <h3>Bom Domingo!!</h3>
          <p>Visita aos irmãos da Copiosa  Redenção 🌳☀ #domingo #paz
          </p>
        </Carousel.Caption>
      </Link>
    </Carousel.Item>
      {/* <Carousel.Item>
          <Image src="https://scontent.fbfh6-1.fna.fbcdn.net/v/t39.30808-6/444483699_18435933376050538_6814353393847821119_n.jpg?stp=dst-jpg_fr_q85&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGM58W-nT22tDAc0vFyqDy5emIDuHj465V6YgO4ePjrlcep2pEmd0ZdktYAN8byeJChSzMJ-4qHM4sRnq5DjAHA&_nc_ohc=2soWLxFHhtEQ7kNvgE3Gv2H&_nc_ht=scontent.fbfh6-1.fna&oh=00_AYDNmONyDN3va5dPkyfZ3n_lL_BWvQVf93zvaPbwa8WRDw&oe=6665B280" alt='postagem2' width={800} height={400} />
        <Carousel.Caption>
          <h3>Postagem 3</h3>
          <p>texto 3</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel >
  );
};

export default MyCarousel;




