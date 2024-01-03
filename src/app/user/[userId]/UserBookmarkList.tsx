import TestPostCardList from "@/components/postCardList/TestPostCardList";

import React from "react";

interface Props {
  userId: string;
}

const getBookmarkList = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/bookmark/${userId}`, { cache: "no-store" });
  const data = await res.json();
  return data;
};

const UserBookmarkList = async ({ userId }: Props) => {
  const dataList: Place[] = await getBookmarkList(userId);
  const placeList = dataList.map((n: any) => {
    const bookmarkPlace: Place = {
      placeName: n.placeName,
      placeId: n.placeId,
      address: "북마크",
      latlng: { lat: 0, lng: 0 },
      imageUrl: n.imageUrl,
      category: "기타"
    };
    return bookmarkPlace;
  });
  return <TestPostCardList placeList={placeList} />;
};

export default UserBookmarkList;
