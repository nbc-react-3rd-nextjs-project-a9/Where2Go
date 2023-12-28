"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

const authPage = () => {
  const [login, setLogin] = useState<boolean>(true);
  return <div>{login ? <SignIn /> : <SignUp />}</div>;
};

export default authPage;
