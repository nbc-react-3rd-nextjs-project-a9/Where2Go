// "use client";
import React from "react";
import { signInWithKakao } from "@/components/auth/authService";
import SignUp from "@/components/auth/SignUp";

const authPage = () => {
  return (
    <div>
      <SignUp />
    </div>
  );
};

export default authPage;
