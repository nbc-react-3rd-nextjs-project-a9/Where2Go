"use client";

import useBookmark from "@/hooks/useBookmark";
import React, { useEffect } from "react";

interface Props {
  placeId: string;
}

enum BookmarkEnum {
  enable = "border-yellow-400"
}

const Bookmark = ({ placeId }: Props) => {
  const userId = sessionStorage.getItem("uid");
  if (!userId) return;
  const { data, addBookmark, isBookmark, deleteBookmark } = useBookmark({ placeId: placeId, userId: userId });

  return (
    <div className="absolute left-4 top-0 translate-y-[-3px] z-10" onClick={!isBookmark ? addBookmark : deleteBookmark}>
      <div
        className={`"border-gray-400" ${
          isBookmark && BookmarkEnum["enable"]
        } relative h-[80px] w-[50px]   border-b-transparent border-l-[25px] border-r-[25px] border-b-[25px]`}
      ></div>
    </div>
  );
};

export default Bookmark;
