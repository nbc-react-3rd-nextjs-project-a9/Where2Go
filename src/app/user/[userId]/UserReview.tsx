"use client";
import PostCardList from "@/components/PostCardList";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPlaceReviewsDataByUserId } from "@/api/places";
import PostReviewCardList from "@/components/PostReviewCardList";
const UserReview = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: placeReviewList } = useQuery({
    queryKey: ["userReview"],
    queryFn: () => getPlaceReviewsDataByUserId(userId)
  });
  // console.log("유저리뷰", placeReviewList);
  return <PostReviewCardList placeReviewList={placeReviewList} />;
};

export default UserReview;
