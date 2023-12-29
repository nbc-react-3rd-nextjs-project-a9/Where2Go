"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { cleanObj } from "@/utils/cleanseData";
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
  const params = useParams();
  const [editMode, setEditMode] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newNickname, setNewNickname] = useState<string>("");
  const mock = {
    nickname: "John Doe",
    myUserId: "123",
    follower: 10,
    following: 10,
    reviews: 10,
    팔로잉여부: false
  };

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

  const updateProfile = () => {
    const data = cleanObj({
      image: newProfileImage,
      nickname: newNickname
    });

    // TODO : supabase로 업로드하기
    console.log("❗supabase로 업로드하기");
    console.log(data);
  };

  return (
    <div className="flex flex-row items-center gap-8">
      <div className="relative">
        <Avatar size="lg" src={newProfileImage && URL.createObjectURL(newProfileImage)} />
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
              placeholder={mock.nickname}
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="rounded-md ring-2 ring-purple-100 outline-none px-2 focus:ring-purple-500"
            />
          </ProfileInfoRow>
        ) : (
          <ProfileInfoRow title="닉네임">{mock.nickname}</ProfileInfoRow>
        )}
        <div className="flex gap-8">
          <ProfileInfoRow title="팔로워">{mock.follower}</ProfileInfoRow>
          <ProfileInfoRow title="팔로잉">{mock.following}</ProfileInfoRow>
        </div>
        <ProfileInfoRow title="리뷰 수">{mock.reviews}</ProfileInfoRow>
        {params.userId !== mock.myUserId ? (
          <div>
            {/* TODO : Optimistic Updates 적용해서 팔로잉 여부 확인하기 */}
            {mock.팔로잉여부 ? (
              <Button size="sm">팔로잉 취소</Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  console.log("Optimistic Updates 적용해서 팔로잉 여부 확인하기");
                }}
              >
                팔로잉
              </Button>
            )}
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