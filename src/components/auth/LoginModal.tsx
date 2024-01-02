"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import { supabase } from "@/lib/supabase";

import { useUserInfoStore } from "@/store/userInfoStore";
import useModalStore from "@/store/modalStore";

import { MdSupportAgent } from "react-icons/md";

const LoginModal = () => {
  const { uid, nickname, avatar_url, updateName, updateAvatar, resetUser, getUID } = useUserInfoStore();
  const { open, setOpen } = useModalStore();
  const [login, setLogin] = useState<boolean>(true);
  const check = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
  };

  const switchMode = () => {
    return login ? <SignIn login={login} setLogin={setLogin} /> : <SignUp login={login} setLogin={setLogin} />;
  };

  return <div className="">{open && switchMode()}</div>;
};

export default LoginModal;
