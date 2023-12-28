"use client";
import Image from "next/image";

import React from "react";
interface Props {
  size: "sm" | "lg";
  src?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const Avatar = ({ size, src, onClick }: Props) => {
  return (
    <Image
      className="rounded-full cursor-pointer"
      src={src ? src : "/images/avatar_default.jpg"}
      width={size === "sm" ? 60 : 150}
      height={size === "sm" ? 60 : 150}
      alt="Picture of the author"
      onClick={onClick}
    />
  );
};

export default Avatar;