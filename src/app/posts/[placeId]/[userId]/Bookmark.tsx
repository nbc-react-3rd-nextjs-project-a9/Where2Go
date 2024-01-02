"use client";

import useBookmark from "@/hooks/useBookmark";
import { supabase } from "@/lib/supabase";
import useLogedInStore from "@/store/logedInStore";
import React, { useEffect, useState } from "react";

interface Props {
  placeId: string;
}

enum BookmarkEnum {
  enable = "border-yellow-400"
}

const Bookmark = ({ placeId }: Props) => {
  const { logedIn } = useLogedInStore();
  const userId = sessionStorage.getItem("uid");
  if (!userId) {
    return;
  }
  const { addBookmark, isBookmark, deleteBookmark } = useBookmark({ placeId, userId });
  return (
    <div className="absolute left-4 top-0 translate-y-[-3px] z-10" onClick={!isBookmark ? addBookmark : deleteBookmark}>
      <div
        className={`"border-gray-400" ${
          isBookmark && BookmarkEnum["enable"]
        } relative h-[80px] w-[50px]   border-b-transparent border-l-[25px] border-r-[25px] border-b-[25px] cursor-pointer`}
      ></div>
    </div>
  );
};

export default Bookmark;
