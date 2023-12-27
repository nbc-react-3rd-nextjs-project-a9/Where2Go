"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Carousel = () => {
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
      {testArr.map((n, i) => (
        <SwiperSlide style={{ display: "flex" }} className="justify-center items-center" key={`slide-${i}`}>
          <div className="w-full h-full bg-center object-cover  bg-[url(https://dummyimage.com/1700x400/616161/fff&text=image)]"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
