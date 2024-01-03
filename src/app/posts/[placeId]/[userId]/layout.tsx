import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "어디가지🍆",
  description: "다른 사람들과 함께 즐기고 싶은 특별한 장소들을 리뷰할 수 있는 페이지 입니다!"
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
