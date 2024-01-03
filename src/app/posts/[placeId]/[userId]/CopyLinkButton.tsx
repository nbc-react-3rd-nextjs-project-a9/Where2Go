"use client";

import Button from "@/components/Button";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { toast } from "react-toastify";

const CopyLinkButton = () => {
  const onClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("링크 복사 완료");
  };
  return (
    <Button size="md" onClick={onClick}>
      <div className="flex items-center">
        <CiShare2 className="mr-2 ml-[-0.5rem] font-bold text-2xl" />
        공유하기
      </div>
    </Button>
  );
};

export default CopyLinkButton;
