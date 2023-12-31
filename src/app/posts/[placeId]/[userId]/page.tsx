"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";
import React, { useEffect, useState } from "react";
import AvatarCarousel from "./AvatarCarousel";
import Bookmark from "@/app/posts/[placeId]/[userId]/Bookmark";
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
import { useRouter } from "next/navigation";
import Follow from "@/components/Follow";
import Link from "next/link";
import UpdatePostForm from "./UpdatePostForm";
import useLogedInStore from "@/store/logedInStore";
import CopyLinkButton from "./CopyLinkButton";
import { BarLoader } from "react-spinners";

const PostPage = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const router = useRouter();
  const [selectUserData, setSelectUserData] = useState<User>();
  const { placeId, userId } = useParams<{ placeId: string; userId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  // const uid = sessionStorage.getItem("uid");
  const { logedIn } = useLogedInStore();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const { data: placeData, isLoading: isPlaceDataLoading } = useQuery({
    queryKey: ["place"],
    queryFn: () => getPlaceDataByPlaceId(placeId)
  });
  const { data: placeReviewData, isLoading: isPlaceReviewDataLoading } = useQuery({
    queryKey: ["placeReview", placeData?.placeId],
    queryFn: () => getPlaceReviewsDataByPlaceName(placeData.placeName),
    enabled: !!placeData
  });
  // console.log("플레이스 리뷰 데이타!", placeReviewData);

  const userIds = placeReviewData?.map((data) => data.userId) || [];

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["users", placeReviewData],
    queryFn: () => getUserDataByUserIds(userIds),
    enabled: !!userIds
  });
  console.log("userData", userData);
  const firstUser = userData && userData[0]?.id;
  console.log("firstUser", firstUser);

  const placeReviewDataByUserId = placeReviewData?.filter((data) => data.userId === userId);
  console.log("플레이스리뷰데이터바이유저아이디", placeReviewDataByUserId);
  const placeReviewId = placeReviewDataByUserId && placeReviewDataByUserId[0]?.placeReviewId;

  const imageUrlList = placeReviewDataByUserId && placeReviewDataByUserId[0]?.imageUrlList;

  // 같은 장소에 리뷰를 쓴 유저들 중 현재 페이지에 맞는 user 정보
  const selectedUser = userData?.find((user) => user.id === userId);

  let publicUrls = [];

  if (placeReviewDataByUserId !== undefined && placeReviewDataByUserId[0]?.imageUrlList) {
    for (const url of placeReviewDataByUserId[0]?.imageUrlList) {
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

  const deletePost = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "한 번 삭제하면 되돌릴 수 없습니다.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          if (placeReviewData?.length === 1) {
            await supabase.from("places").delete().eq("placeId", placeId);
            await supabase.from("placeReview").delete().eq("placeReviewId", placeReviewId);
            // 스토리지에서 이미지 파일 삭제
            for (const imageUrl of imageUrlList) {
              await supabase.storage.from("placeReviewImg").remove([imageUrl]);
            }
            router.push("/");
          } else {
            await supabase.from("placeReview").delete().eq("placeReviewId", placeReviewId);
            // 스토리지에서 이미지 파일 삭제
            for (const imageUrl of imageUrlList) {
              await supabase.storage.from("placeReviewImg").remove([imageUrl]);
            }
            router.push(`/posts/${placeId}/${firstUser}`);
          }
        })();
      }
    });
  };
  if (isEditing) {
    return (
      <UpdatePostForm
        initialData={placeReviewDataByUserId && placeReviewDataByUserId[0]}
        onCancel={handleCancelEdit}
        placeId={placeId}
        setIsEditing={setIsEditing}
      />
    );
  }

  if (isPlaceDataLoading || isPlaceReviewDataLoading || isUserDataLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <BarLoader color="#4C1D95" height={10} width={300} className="" />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {logedIn && <Bookmark placeId={placeId} />}
        <Carousel urls={publicUrls} />
        <div className="flex w-full px-4 py-4 text-white justify-between items-center absolute bottom-0 z-10 backdrop-blur-sm  backdrop-contrast-75">
          <h1 className="font-bold text-2xl">{placeData?.placeName}</h1>
          <div>
            <CopyLinkButton />
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
                <Link href={`/user/${selectedUser?.id}`}>
                  <Avatar size="sm" src={selectedUser?.avatar_url} />
                </Link>
                <p className="font-bold min-w-[5rem]">{selectedUser?.username}</p>
                {/* TODO : 유저가 나인지 아닌지 확인하고 작업 ㄱㄱ */}
                {currentUserId !== userId ? (
                  <Follow userId={userId} userNickname={selectedUser?.username} />
                ) : (
                  <>
                    <Button size="sm" theme="success" onClick={handleEditClick}>
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
        <Section title="방문 날짜">
          <p className="">{placeReviewDataByUserId && placeReviewDataByUserId[0]?.visitedAt}</p>
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
