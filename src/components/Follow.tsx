import React from "react";
import Button from "./Button";
import { supabase } from "@/lib/supabase";

const Follow = () => {
  // 디테일 페이지
  // 로그인 되어 있는 유저와 글을 작성한 유저 id 비교
  // 다르면 팔로우 버튼
  // 팔로우 누르면 follower에 본인 follow에 작성자 id
  const followBtnHandler = async () => {
    const { error: followError } = await supabase.from("follow").insert([
      {
        follower: "",
        following: ""
      }
    ]);
  };
  return <Button>팔로우</Button>;
};

export default Follow;
