"use client";

import React, { useEffect, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import Avatar from "@/components/Avatar";
import { useParams, useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

interface Props {
  avatarList: any[] | null | undefined;
}

const AvatarCarousel = ({ avatarList }: Props) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const swiperSlide = useSwiperSlide();
  const { placeId } = useParams();

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

  console.log("avatarList", avatarList);

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
        {avatarList?.map((data, index) => (
          <SwiperSlide key={uuidv4()} virtualIndex={index} className="py-4 px-4">
            <Link href={`/posts/${placeId}/${data.id}`}>
              <Avatar
                size="md"
                // src={data.avatar_url}
                className="hover:scale-110"
                // onClick={() => onClickAvatar(n)}
                onClick={() => console.log(1)}
              />
              <p>{data.username}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AvatarCarousel;
