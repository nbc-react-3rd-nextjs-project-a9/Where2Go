"use client";

import React, { useEffect, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import Avatar from "@/components/Avatar";
import { useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
  avatarList: User[];
}

const AvatarCarousel = ({ avatarList }: Props) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const swiperSlide = useSwiperSlide();

  const slideTo = (index: number) => {
    swiperRef.slideTo(index - 1, 0);
  };

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!!swiperRef) {
      // TODO : userId로 몇번째인가 확인하고 index 넣어주기
      slideTo(Number(userId));
    }
  }, [swiperRef]);
  return (
    <>
      <Swiper
        className="draggable-disable"
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={8}
        centeredSlides={false}
        spaceBetween={30}
        pagination={{
          type: "custom"
        }}
        navigation={true}
        virtual
      >
        {avatarList.map((data, index) => (
          <SwiperSlide key={uuidv4()} virtualIndex={index} className="py-4 px-4">
            <Avatar
              size="md"
              src={data.imageUrl.url}
              className="hover:scale-110"
              // onClick={() => onClickAvatar(n)}
              onClick={() => console.log(1)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AvatarCarousel;
