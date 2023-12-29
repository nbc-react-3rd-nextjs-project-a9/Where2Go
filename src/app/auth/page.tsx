"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

import { useUserInfoStore } from "@/store/userInfoStore";

import { signOut, checkAuth } from "@/components/auth/authService";

const authPage = () => {
  const { uid, nickname, updateName, updateAvatar, resetUser, getUID } = useUserInfoStore();

  const [login, setLogin] = useState<boolean>(true);

  return (
    <div>
      {login ? <SignIn login={login} setLogin={setLogin} /> : <SignUp login={login} setLogin={setLogin} />}
      <button onClick={signOut}>logout</button>
      <br />
      <button onClick={checkAuth}>check</button>
      <br />
      <button onClick={() => console.log(uid)}>store</button>
    </div>
  );
};

export default authPage;
