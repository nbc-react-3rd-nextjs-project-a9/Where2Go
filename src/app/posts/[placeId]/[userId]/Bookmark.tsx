"use client";

import { useParams } from "next/navigation";
import React from "react";

enum BookmarkEnum {
  enable = "border-yellow-400"
}

const Bookmark = () => {
  const params = useParams();
  console.log(params.placeId);

  return (
    <div className="absolute left-4 top-0 translate-y-[-3px] z-10">
      <div
        className={`"border-gray-400" ${
          true && BookmarkEnum["enable"]
        } relative h-[80px] w-[50px]   border-b-transparent border-l-[25px] border-r-[25px] border-b-[25px]`}
      ></div>
    </div>
  );
};

export default Bookmark;
