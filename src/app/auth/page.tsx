"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import { supabase } from "@/lib/supabase";

import useModalStore from "@/store/modalStore";

import { signOut, checkAuth } from "@/components/auth/authService";

const authPage = () => {
  const { open, setOpen } = useModalStore();
  const [login, setLogin] = useState<boolean>(true);
  const check = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
  };

  return (
    <div className="">
      <button onClick={() => setOpen(true)}>open</button>
      <br />

      <button
        onClick={() => {
          signOut();
          sessionStorage.clear();
        }}
      >
        logout
      </button>
      <br />
      <button onClick={checkAuth}>check</button>
      <br />
      <button onClick={() => check()}>supabase getUser()</button>
    </div>
  );
};

export default authPage;
