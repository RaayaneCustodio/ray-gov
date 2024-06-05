
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
        <Link href={"https://www.facebook.com/photo/?fbid=855326679748751&set=a.155220149759411"}>
          <Image src="https://scontent.fbfh6-1.fna.fbcdn.net/v/t39.30808-6/444455835_18435152311050538_6661775623357797219_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEipTJ5k_0ke4Trw9v2rHR1mLUTcy9fHSOYtRNzL18dIxkz5lxoFtMkHiIzy_nKsgj7BB418Tp8OIAbu_SUPKS-&_nc_ohc=Ryr3Y1brKh8Q7kNvgFaiqg6&_nc_ht=scontent.fbfh6-1.fna&oh=00_AYCWEH-pNdX4VJdfTOv7iMPx3CQHEVmLFhUa7_EUTvAUcg&oe=666588E1" alt='postagem' width={800} height={400} />

        </Link>
        <Carousel.Caption>
          <h3>Postagem 1</h3>
          <p>texto 1</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={"https://www.facebook.com/photo/?fbid=861836392431113&set=a.155220149759411"}>
          <Image src="https://scontent.fbfh6-1.fna.fbcdn.net/v/t39.30808-6/444503988_861836395764446_3534945374592479391_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE8sXfosaRqtBbwvmS8PlCUw4oDcvxBW_bDigNy_EFb9rcVP4psVXc15riNYkCBSfZL7A-QES5pkvciEtFjMwia&_nc_ohc=Lnp8-kzc1-8Q7kNvgEwzn3F&_nc_ht=scontent.fbfh6-1.fna&oh=00_AYAzTzku89QJVdP0sQtWi0iCOU8G_83FH92g9fFITj6sag&oe=6665B0C7" alt='postagem1' width={800} height={400} />

        </Link>
        <Carousel.Caption>
          <h3>Postagem 2</h3>
          <p>texto 2</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link href={"https://www.facebook.com/photo/?fbid=858789149402504&set=pcb.858789196069166"}>
          <Image src="https://scontent.fbfh6-1.fna.fbcdn.net/v/t39.30808-6/444483699_18435933376050538_6814353393847821119_n.jpg?stp=dst-jpg_fr_q85&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGM58W-nT22tDAc0vFyqDy5emIDuHj465V6YgO4ePjrlcep2pEmd0ZdktYAN8byeJChSzMJ-4qHM4sRnq5DjAHA&_nc_ohc=2soWLxFHhtEQ7kNvgE3Gv2H&_nc_ht=scontent.fbfh6-1.fna&oh=00_AYDNmONyDN3va5dPkyfZ3n_lL_BWvQVf93zvaPbwa8WRDw&oe=6665B280" alt='postagem2' width={800} height={400} />

        </Link>
        <Carousel.Caption>
          <h3>Postagem 3</h3>
          <p>texto 3</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;




