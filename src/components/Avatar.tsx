"use client";
import Image from "next/image";

import React from "react";
interface Props {
  size: keyof typeof AvatarSizeEnum;
  src?: string | null;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  className?: string;
}

enum AvatarSizeEnum {
  sm = "w-[30px] h-[30px]",
  md = "w-[60px] h-[60px]",
  lg = "w-[150px] h-[150px]"
}

const Avatar = ({ size, src, onClick, className }: Props) => {
  return (
    <figure className={`${AvatarSizeEnum[size]} overflow-hidden  ${className}`}>
      <Image
        className={`rounded-full cursor-pointer ${AvatarSizeEnum[size]}`}
        src={src ? src : "/images/avatar_default.jpg"}
        width={size === "sm" ? 60 : 150}
        height={size === "sm" ? 60 : 150}
        alt="Picture of the author"
        onClick={onClick}
      />
    </figure>
  );
};

export default Avatar;
