"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { getFollowListByUserId } from "@/api/places";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useFollowQuery } from "@/hooks/useFollowQuery";

const Follow = ({ userId, userNickname }: { userId: string; userNickname: string }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const id = sessionStorage.getItem("uid");

  const { followingList, isFollowingListLoading, addFollowMutation, deleteFollowMutation } = useFollowQuery();

  // following 리스트에 userId가 있다면
  const checkFollowingStatus = () => {
    if (!followingList?.find((data) => data.to === userId) || id === null) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };

  const addFollow = (newFollow: Follow) => {
    addFollowMutation.mutate(newFollow);
  };

  const deleteFollow = (id: string | string[]) => {
    deleteFollowMutation.mutate(id);
  };

  const followBtnHandler = async () => {
    if (id === null) {
      Swal.fire({
        title: "로그인이 필요합니다."
      });
      return;
    }

    // followinglist에 userid가 없을 때 추가 있으면 팔로우 중 버튼으로 변경
    if (!followingList?.find((data) => data.to === userId) && id !== userId) {
      addFollow({ from: id, to: userId });
      setIsFollowing(true);
    }
  };

  const deleteFollowBtnHandler = () => {
    if (id === null) {
      Swal.fire({
        title: "로그인이 필요합니다."
      });
      return;
    }
    Swal.fire({
      title: `${userNickname}님을 팔로우 취소하시겠습니까?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "팔로우가 취소되었습니다!",
          icon: "success"
        });
        deleteFollow(userId);
        setIsFollowing(false);
      }
    });
  };

  useEffect(() => {
    checkFollowingStatus();
  }, []);
  if (isFollowingListLoading) {
    return <Button size="sm">로딩중</Button>;
  }
  return (
    <>
      {isFollowing ? (
        <Button size="sm" onClick={() => deleteFollowBtnHandler()}>
          팔로잉
        </Button>
      ) : (
        <Button size="sm" onClick={() => followBtnHandler()}>
          팔로우
        </Button>
      )}
    </>
  );
};

export default Follow;
