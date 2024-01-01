"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";
import { mockUserData } from "@/data/mockUser";
import React, { useEffect, useState } from "react";
import AvatarCarousel from "./AvatarCarousel";
import Bookmark from "@/app/posts/[placeId]/[userId]/Bookmark";
import { CiShare2 } from "react-icons/ci";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getPlaceDataByPlaceId,
  getPlaceReviewsDataByPlaceName,
  getPlaceReviewsDataByPlaceNameAndUserId,
  getUserDataByUserIds,
  getUserIdInPlaceReviewsDataByPlaceName
} from "@/api/places";
import MapContainer from "@/components/map/MapContainer";

const PostPage = () => {
  const [selectUserData, setSelectUserData] = useState<User>();
  // const [publicUrls, setPublicUrls] = useState([])
  const { placeId, userId } = useParams();

  console.log(placeId);
  // console.log("목유저데이터", mockUserData);

  const onClickAvatar = (data: User) => {
    setSelectUserData(data);
  };
  useEffect(() => {
    setSelectUserData(mockUserData[0]);
  }, []);

  const { data: placeData, isLoading: isPlaceDataLoading } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlaceDataByPlaceId(placeId)
  });

  const { data: userIdsData, isLoading: isUserIdsDataLoading } = useQuery({
    queryKey: ["userIds"],
    queryFn: () => getUserIdInPlaceReviewsDataByPlaceName(placeData.placeName),
    enabled: !!placeData
  });

  const { data: placeReviewDataByUserId, isLoading: isplaceReviewDataByUserIdLoading } = useQuery({
    queryKey: ["placeReviewByUserId"],
    queryFn: () => getPlaceReviewsDataByPlaceNameAndUserId(placeData.placeName, userId)
  });

  console.log("플레이스 리뷰@ 바이 유저아이디", placeReviewDataByUserId);
  // const userIds = placeReviewData?.map((data) => data.userId) || [];

  const userIds = userIdsData?.map((data) => data.userId) || [];

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserDataByUserIds(userIds),
    enabled: !!userIds
  });

  let publicUrls: string[] = [];
  // useEffect(() => {
  //   const fetchPublicUrls = async () => {
  //     if (placeReviewDataByUserId !== undefined && placeReviewDataByUserId) {
  //       for (const url of placeReviewDataByUserId?.imageUrlList) {
  //         console.log("url", url);
  //         const { data } = supabase.storage.from("placeReviewImg").getPublicUrl(url);
  //         publicUrls.push(data.publicUrl);
  //       }
  //     }
  //   };
  //   fetchPublicUrls();
  // }, []);

  const getImageUrls = async (): Promise<string[]> => {
    let publicUrls = [];
    if (placeReviewDataByUserId) {
      publicUrls = await Promise.all(
        (placeReviewDataByUserId?.imageUrlList).map(async (imageUrl: string) => {
          const { data } = supabase.storage.from("placeReviewImg").getPublicUrl(imageUrl);
          return data?.publicUrl;
        })
      );
    }
    console.log("publicUrls", publicUrls);
    return publicUrls; // 필터링하여 null 또는 undefined 값 제거
  };
  useEffect(() => {
    const fetchImageUrls = async () => {
      const imageUrls = await getImageUrls();
      console.log("Image URLs:", imageUrls);
    };

    fetchImageUrls(); // 함수를 호출
  }, []);
  if (isPlaceDataLoading || isUserIdsDataLoading || isplaceReviewDataByUserIdLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <>
      <div className="relative">
        <Bookmark />
        <Carousel urls={publicUrls} />
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
      <div className="">
        <Section title="다녀간 사람들">
          <AvatarCarousel avatarList={userData} />
        </Section>
        <Section title="리뷰">
          {!!selectUserData ? (
            <>
              <div className="flex flex-row items-center gap-4 mb-4">
                <Avatar size="md" src={selectUserData.imageUrl.url} />
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
              <p className="">{placeReviewDataByUserId && placeReviewDataByUserId[0]?.content}</p>
            </>
          ) : (
            <></>
          )}
        </Section>
        <Section title="주소">
          <p>{placeData?.address}</p>
        </Section>
        <Section title="지도">
          <MapContainer lat={placeData?.latlng.lat} lng={placeData?.latlng.lng} />
        </Section>
      </div>
    </>
  );
};

export default PostPage;
