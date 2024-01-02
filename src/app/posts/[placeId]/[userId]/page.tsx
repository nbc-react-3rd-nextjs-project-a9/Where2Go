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
import { getPlaceDataByPlaceId, getPlaceReviewsDataByPlaceName, getUserDataByUserIds } from "@/api/places";
import MapContainer from "@/components/map/MapContainer";
import Follow from "@/components/Follow";
import Link from "next/link";

const PostPage = () => {
  const [selectUserData, setSelectUserData] = useState<User>();
  const { placeId, userId }: { placeId: string; userId: string } = useParams();

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
  // console.log("플레이스데이터 한개", placeData);

  // queryKey 추가
  const { data: placeReviewData, isLoading: isPlaceReviewDataLoading } = useQuery({
    queryKey: ["placeReview", placeData],
    queryFn: () => getPlaceReviewsDataByPlaceName(placeData.placeName),
    enabled: !!placeData
  });
  // console.log("플레이스 리뷰 데이타!", placeReviewData);

  const userIds = placeReviewData?.map((data) => data.userId) || [];
  // console.log("userIds", userIds);

  // isLoading 옵션 추가, queryKey 추가
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["users", placeReviewData],
    queryFn: () => getUserDataByUserIds(userIds),
    enabled: !!userIds
  });
  // console.log("유저데이터에용", userData);

  const placeReviewDataByUserId = placeReviewData?.filter((data) => data.userId === userId);
  // console.log("플레이스 리뷰데이터 바이 유저아이디", placeReviewDataByUserId);

  // 같은 장소에 리뷰를 쓴 유저들 중 현재 페이지에 맞는 user 정보
  const selectedUser = userData?.find((user) => user.id === userId);
  // console.log("selected User", selectedUser);

  let publicUrls = [];

  if (placeReviewDataByUserId !== undefined && placeReviewDataByUserId[0]?.imageUrlList) {
    for (const url of placeReviewDataByUserId[0]?.imageUrlList) {
      // console.log("url", url);
      const { data } = supabase.storage.from("placeReviewImg").getPublicUrl(url);
      publicUrls.push(data.publicUrl);
    }
  }
  // console.log("publicUrls", publicUrls);

  if (isPlaceDataLoading || isPlaceReviewDataLoading || isUserDataLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="relative">
        <Bookmark placeId={placeId} />
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
                <Link href={`/user/${selectedUser?.id}`}>
                  <Avatar size="sm" src={selectedUser?.avatar_url} />
                </Link>
                <p className="font-bold min-w-[5rem]">{selectedUser?.username}</p>
                {/* TODO : 유저가 나인지 아닌지 확인하고 작업 ㄱㄱ */}
                {true ? (
                  <Follow userId={userId} userNickname={selectedUser?.username} />
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
