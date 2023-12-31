"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import { supabase } from "@/lib/supabase";

import { useUserInfoStore } from "@/store/userInfoStore";

import { signOut, checkAuth } from "@/components/auth/authService";
import { MdSupportAgent } from "react-icons/md";

const authPage = () => {
  const { uid, nickname, avatar_url, updateName, updateAvatar, resetUser, getUID } = useUserInfoStore();

  const [login, setLogin] = useState<boolean>(true);
  const check = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
  };

  return (
    <div>
      {login ? <SignIn login={login} setLogin={setLogin} /> : <SignUp login={login} setLogin={setLogin} />}
      <button
        onClick={() => {
          signOut();
          resetUser();
        }}
      >
        logout
      </button>
      <br />
      <button onClick={checkAuth}>check</button>
      <br />
      <button onClick={() => console.log(uid, nickname, avatar_url)}>store</button>
      <br />
      <button onClick={() => check()}>supabase getUser()</button>
    </div>
  );
};

export default authPage;
