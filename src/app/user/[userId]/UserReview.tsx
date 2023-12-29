import PostCardList from "@/components/PostCardList";
import React from "react";
import { mockPlaceData } from "@/data/mockPlace";
const UserReview = () => {
  return <PostCardList placeList={mockPlaceData} />;
};

export default UserReview;
