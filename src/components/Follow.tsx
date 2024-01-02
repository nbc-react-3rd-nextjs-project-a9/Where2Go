import React from "react";
import Button from "./Button";
import { supabase } from "@/lib/supabase";
import { useUserInfoStore } from "@/store/userInfoStore";
import { getFollowListByUserId } from "@/api/places";
import { useQuery } from "@tanstack/react-query";

const Follow = ({ userId }: { userId: string | string[] }) => {
  // 디테일 페이지
  // 로그인 되어 있는 유저와 글을 작성한 유저 id 비교
  // 다르면 팔로우 버튼
  // 팔로우 누르면 follower에 본인 follow에 작성자 id
  const { uid } = useUserInfoStore();

  const { data: followingList, isLoading: isFollowingListLoading } = useQuery({
    queryKey: ["followingUser", uid],
    queryFn: () => getFollowListByUserId(uid)
  });

  const followBtnHandler = async () => {
    // followinglist에 userid가 없을 때 추가 있으면 팔로우 중 버튼으로 변경
    if (!followingList?.find((data) => data.to === userId)) {
      const { error: followError } = await supabase.from("follow").insert([
        {
          from: uid,
          to: userId
        }
      ]);
      if (followError) {
        alert("follow error");
        console.log("error", followError);
      }
      //   setIsFollowing(true);
    } else {
      //   setIsFollowing(false);
    }
  };

  return (
    <Button size="sm" onClick={() => followBtnHandler()}>
      팔로우
    </Button>
  );
};

export default Follow;
