"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";
import { mockUserData } from "@/data/mockUser";
import React, { useEffect, useState } from "react";
import AvatarCarousel from "./AvatarCarousel";
import Bookmark from "@/app/posts/[placeId]/Bookmark";
import { CiShare2 } from "react-icons/ci";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPlaceDataByPlaceId, getPlaceReviewsDataByPlaceName } from "@/api/places";

const PostPage = () => {
  const [selectUserData, setSelectUserData] = useState<User>();
  // const [placeData, setPlaceData] = useState<Place[]>();
  // const [placeReviewData, setPlaceReviewData] = useState<PlaceReview[]>();
  const { placeId } = useParams();

  console.log(placeId);
  console.log("목유저데이터", mockUserData);

  const onClickAvatar = (data: User) => {
    setSelectUserData(data);
  };
  useEffect(() => {
    setSelectUserData(mockUserData[0]);
  }, []);

  const { data: placeData } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlaceDataByPlaceId(placeId)
  });
  console.log("플레이스데이터 한개", placeData);

  const { data: placeReviewData } = useQuery({
    queryKey: ["placeReviews"],
    queryFn: () => getPlaceReviewsDataByPlaceName(placeData.placeName),
    enabled: !!placeData // placeData가 존재할 때에만 쿼리 실행
  });
  console.log("플레이스 리뷰 데이타!", placeReviewData);
  return (
    <>
      <div className="relative">
        <Bookmark />
        <Carousel />
        <div className="flex w-full px-4 py-4 text-white justify-between items-center absolute bottom-0 z-10 backdrop-blur-sm  backdrop-contrast-75">
          <h1 className="font-bold text-2xl">{placeData?.placeName}</h1>
          <div>
            <Button size="md">
              <div className="flex items-center">
                <CiShare2 className="mr-2 ml-[-0.5rem] font-bold text-2xl" />
                공유하기
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Section title="다녀간 사람들">
          <AvatarCarousel avatarList={mockUserData} />
        </Section>
        <Section title="리뷰">
          {!!selectUserData ? (
            <>
              <div className="flex flex-row items-center gap-4 mb-4">
                <Avatar size="sm" src={selectUserData.imageUrl.url} />
                <p className="font-bold min-w-[5rem]">{selectUserData.nickname}</p>
                {/* TODO : 유저가 나인지 아닌지 확인하고 작업 ㄱㄱ */}
                {true ? (
                  <Button size="sm" onClick={() => console.log(1)}>
                    {true ? "팔로우" : "팔로우 중"}
                  </Button>
                ) : (
                  <>
                    <Button size="sm" theme="success" onClick={() => console.log(1)}>
                      수정하기
                    </Button>
                    <Button size="sm" theme="warning" onClick={() => console.log(1)}>
                      삭제하기
                    </Button>
                  </>
                )}
              </div>
              <p className="">{placeReviewData && placeReviewData[0].content}</p>
            </>
          ) : (
            <></>
          )}
        </Section>
        <Section title="주소">
          <>address 넣기</>
        </Section>
        <Section title="지도">
          <>지도 넣기</>
        </Section>
      </div>
    </>
  );
};

export default PostPage;
