"use client";

import { getFollowListByUserId, getFollowedListByUserId, getPlaceReviewsDataByUserId } from "@/api/places";
import { getUserDataByUserId } from "@/api/users";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Follow from "@/components/Follow";
import { supabase } from "@/lib/supabase";
import useLogedInStore from "@/store/logedInStore";
import { cleanObj } from "@/utils/cleanseData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";

interface ProfileListItemProps {
  title: string;
  children?: any;
}

const ProfileInfoRow = ({ title, children }: ProfileListItemProps) => {
  return (
    <div className="flex flex-row gap-4">
      <h3 className="font-bold min-w-14">{title}</h3>
      {children}
    </div>
  );
};

const UserProfile = () => {
  const newNicknameInput = useRef<HTMLInputElement>(null);
  const { userId } = useParams<{ userId: string }>();
  const [editMode, setEditMode] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newNickname, setNewNickname] = useState<string>("");

  const { logedIn } = useLogedInStore();

  const curUserId = logedIn ? sessionStorage.getItem("uid") : "";

  const { data: userData, refetch: userRefetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDataByUserId(userId)
  });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();
  //     console.log("유저데이터", user);
  //   };
  //   fetchUserData();
  // }, []);
  const { data: followingList } = useQuery({
    queryKey: ["followingList", userId],
    queryFn: () => getFollowListByUserId(userId)
  });

  const { data: followedList } = useQuery({
    queryKey: ["followedUser", userId],
    queryFn: () => getFollowedListByUserId(userId)
  });

  const { data: placeReviewData } = useQuery({
    queryKey: ["placeReview", userId],
    queryFn: () => getPlaceReviewsDataByUserId(userId)
  });

  useEffect(() => {
    if (!editMode) return;
    newNicknameInput.current?.focus();
  }, [editMode]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const newProfileImage = e.target.files[0];
      setNewProfileImage(newProfileImage);
      return (e.target.files = null);
    }
  };

  const cancelEditMode = () => {
    setNewNickname("");
    setNewProfileImage(null);
    setEditMode(false);
  };

  const updateProfile = async () => {
    const data = cleanObj({
      image: newProfileImage,
      nickname: newNickname
    });

    //프로필 이미지 수정 시
    if (newProfileImage !== null) {
      //이미지 파일 스토리지(newProfileImage)에 업로드
      const { data: fileData, error: fileError } = await supabase.storage
        .from("userProfileImg")
        .upload(`${newProfileImage.name}`, newProfileImage);
      if (fileError) {
        console.error("이미지 업로드 중 오류 발생:", fileError.message);
        return;
      }
      const newAvatarUrl = fileData.path;
      const { data: publicUrl } = supabase.storage.from("userProfileImg").getPublicUrl(fileData.path);
      console.log(newAvatarUrl);
      // userInfo 테이블 업데이트
      const { error } = await supabase.from("userinfo").update({ avatar_url: publicUrl.publicUrl }).eq("id", curUserId);
      console.log(error);
      // 세션스토리지 업데이트
      sessionStorage.setItem("avatar_url", newAvatarUrl);

      setEditMode(false);
    }

    //닉네임 수정 시
    if (newNickname !== "") {
      const { error: nameError } = await supabase
        .from("userinfo")
        .update({ username: newNickname })
        .eq("id", curUserId);
      console.log(nameError);
      // 세션스토리지 업데이트
      sessionStorage.setItem("nickname", newNickname);
    }

    cancelEditMode();
    userRefetch();
  };

  return (
    <div className="flex flex-row items-center gap-8">
      <div className="relative">
        <Avatar size="lg" src={(newProfileImage && URL.createObjectURL(newProfileImage)) || userData?.avatar_url} />

        {editMode && (
          <>
            <label className="absolute top-0 w-full h-full flex flex-col justify-center items-center text-white transition-opacity cursor-pointer rounded-full backdrop-blur-sm backdrop-brightness-50 opacity-0 hover:opacity-100">
              <input
                className="hidden"
                type="file"
                onChange={handleChangeImage}
                name="profile__img-input"
                id="profile__img-input"
              />
              <MdPhotoCameraBack className="text-[4rem] mx-auto" />
              <p className="font-bold">이미지 변경</p>
            </label>
          </>
        )}
      </div>
      <div className=" flex flex-col gap-4 ">
        {editMode ? (
          <ProfileInfoRow title="닉네임">
            <input
              ref={newNicknameInput}
              type="text"
              placeholder={userData?.username}
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="rounded-md ring-2 ring-purple-100 outline-none px-2 focus:ring-purple-500"
            />
          </ProfileInfoRow>
        ) : (
          <>
            <ProfileInfoRow title="닉네임">{userData?.username}</ProfileInfoRow>
            <ProfileInfoRow title="이메일">{userData?.email}</ProfileInfoRow>
          </>
        )}
        <div className="flex gap-8">
          <ProfileInfoRow title="팔로워">{followedList?.length}</ProfileInfoRow>
          <ProfileInfoRow title="팔로잉">{followingList?.length}</ProfileInfoRow>
        </div>
        <ProfileInfoRow title="리뷰 수">{placeReviewData?.length}</ProfileInfoRow>
        {userId !== curUserId ? (
          <div>
            <Follow userId={userId} userNickname={userData?.username} />
          </div>
        ) : (
          <div className="flex flex-row gap-8">
            {editMode ? (
              <>
                <Button size="sm" theme="success" onClick={updateProfile}>
                  수정완료
                </Button>
                <Button size="sm" theme="warning" onClick={cancelEditMode}>
                  취소하기
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setEditMode(true)}>
                수정하기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
