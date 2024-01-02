"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

import useModalStore from "@/store/modalStore";

const LoginModal = () => {
  const { open, setOpen } = useModalStore();
  const [login, setLogin] = useState<boolean>(true);

  const switchMode = () => {
    return login ? (
      <SignIn login={login} setLogin={setLogin} setOpen={setOpen} />
    ) : (
      <SignUp login={login} setLogin={setLogin} setOpen={setOpen} />
    );
  };

  return (
    <>
      <div>{open && switchMode()}</div>
    </>
  );
};

export default LoginModal;
