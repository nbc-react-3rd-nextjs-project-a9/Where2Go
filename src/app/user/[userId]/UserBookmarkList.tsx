import TestPostCardList from "@/components/postCardList/TestPostCardList";

import React from "react";

const getBookmarkList = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/bookmark/${userId}`, { cache: "no-store" });
  const data = await res.json();

  return data;
};

const UserBookmarkList = async () => {
  const userId = "0fe6b943-b306-4c93-88b7-8118a3d2fb5e";
  const data = await getBookmarkList(userId);
  const placeList = data.map((n: any) => {
    const bookmarkPlace: Place = {
      placeName: n.placeName,
      placeId: n.placeId,
      address: "",
      latlng: { lat: 0, lng: 0 },
      imageUrl: n.imageUrl,
      category: "기타"
    };
    return bookmarkPlace;
  });

  return <TestPostCardList placeList={placeList} />;
};

export default UserBookmarkList;
