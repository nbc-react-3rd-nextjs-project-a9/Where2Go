import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "어디가지 - 작성 페이지",
  description: "함께 즐기고 싶은 특별한 장소들을 작성하는 페이지 입니다!"
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
