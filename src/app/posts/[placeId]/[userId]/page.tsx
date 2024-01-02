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
  getUserDataByUserIds
} from "@/api/places";
import MapContainer from "@/components/map/MapContainer";
import Swal from "sweetalert2";

const PostPage = () => {
  // const [selectUserData, setSelectUserData] = useState<User>();
  const { placeId, userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState("");
  // console.log("목유저데이터", mockUserData);

  // const onClickAvatar = (data: User) => {
  //   setSelectUserData(data);
  // };

  // useEffect(() => {
  //   setSelectUserData(mockUserData[0]);
  // }, []);

  const { data: placeData, isLoading: isPlaceDataLoading } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlaceDataByPlaceId(placeId)
  });

  // queryKey 추가
  const { data: placeReviewData, isLoading: isPlaceReviewDataLoading } = useQuery({
    queryKey: ["placeReview", placeData],
    queryFn: () => getPlaceReviewsDataByPlaceName(placeData.placeName),
    enabled: !!placeData
  });

  const userIds = placeReviewData?.map((data) => data.userId) || [];
  // isLoading 옵션 추가, queryKey 추가

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["users", placeReviewData],
    queryFn: () => getUserDataByUserIds(userIds),
    enabled: !!userIds
  });

  const { data: placeReviewDataByUserId } = useQuery({
    queryKey: ["placeReviewData", placeReviewData],
    queryFn: () => getPlaceReviewsDataByPlaceNameAndUserId(placeData.placeName, userId)
  });
  // console.log("플로에스리뷰데이터바이유저아이디@", placeReviewDataByUserIdD);

  // const placeReviewDataByUserId = placeReviewData?.filter((data) => data.userId === userId);
  console.log("플레이스리뷰데이터바이유저아이디", placeReviewDataByUserId);
  // const placeReviewId = placeReviewDataByUserId[0].placeReviewId
  // 같은 장소에 리뷰를 쓴 유저들 중 현재 페이지에 맞는 user 정보
  const selectedUser = userData?.find((user) => user.id === userId);

  let publicUrls = [];

  if (placeReviewDataByUserId !== undefined && placeReviewDataByUserId?.imageUrlList) {
    for (const url of placeReviewDataByUserId?.imageUrlList) {
      const { data } = supabase.storage.from("placeReviewImg").getPublicUrl(url);
      publicUrls.push(data.publicUrl);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session) {
        console.log("세션", session.user);
        setCurrentUserId(session.user.id);
      }
    };
    fetchUser();
  }, []);

  console.log("현재유저", currentUserId);
  console.log("userId", userId);

  const deletePost = async () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "한 번 삭제하면 되돌릴 수 없습니다.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        // const { error } = await supabase.from("placeReview").delete().eq("placeReviewId", d);
      }
    });
  };
  if (isPlaceDataLoading || isPlaceReviewDataLoading || isUserDataLoading) {
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
          {
            <>
              <div className="flex flex-row items-center gap-4 mb-4">
                <Avatar size="sm" src={selectedUser?.avatar_url} />
                <p className="font-bold min-w-[5rem]">{selectedUser?.username}</p>
                {/* TODO : 유저가 나인지 아닌지 확인하고 작업 ㄱㄱ */}
                {currentUserId !== userId ? (
                  <Button size="sm" onClick={() => console.log(1)}>
                    {true ? "팔로우" : "팔로우 중"}
                  </Button>
                ) : (
                  <>
                    <Button size="sm" theme="success" onClick={() => console.log(1)}>
                      수정하기
                    </Button>
                    <Button size="sm" theme="warning" onClick={deletePost}>
                      삭제하기
                    </Button>
                  </>
                )}
              </div>
              <p className="">{placeReviewDataByUserId && placeReviewDataByUserId[0]?.content}</p>
            </>
          }
        </Section>
        <Section title="주소">
          <p>{placeData.address}</p>
        </Section>
        <Section title="지도">
          <MapContainer lat={placeData.latlng.lat} lng={placeData.latlng.lng} />
        </Section>
      </div>
    </>
  );
};

export default PostPage;
