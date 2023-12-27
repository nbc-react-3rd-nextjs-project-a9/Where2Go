// "use client";
import React from "react";
import { signInWithKakao } from "@/components/auth/authService";
import Login from "@/components/auth/Login";

const authPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default authPage;
