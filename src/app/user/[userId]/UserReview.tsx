"use client";
import PostCardList from "@/components/PostCardList";
import React from "react";
import { mockPlaceData } from "@/data/mockPlace";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPlaceReviewsDataByUserId } from "@/api/places";
const UserReview = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: placeReviewList } = useQuery({
    queryKey: ["userReview"],
    queryFn: () => getPlaceReviewsDataByUserId(userId)
  });
  console.log("유저리뷰", placeReviewList);
  return <PostCardList placeList={placeReviewList} />;
};

export default UserReview;
