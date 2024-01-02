"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
type Props = {
  urls?: string[];
};
const Carousel = ({ urls }: Props) => {
  // TODO : 이미지 넣기

  const testArr = [1, 2, 3, 4, 5];
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-[400px]"
    >
      {urls?.map((n, i) => (
        <SwiperSlide style={{ display: "flex" }} className="justify-center items-center" key={`slide-${i}`}>
          <div style={{ backgroundImage: `url(${n})` }} className="w-full h-full bg-center object-cover"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
