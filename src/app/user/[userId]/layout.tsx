import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "어디가지 - 마이페이지",
  description: "유저의 정보를 확인할 수 있는 페이지 입니다."
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
