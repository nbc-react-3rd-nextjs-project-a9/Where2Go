// "use client";
import React from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

const authPage = () => {
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default authPage;
