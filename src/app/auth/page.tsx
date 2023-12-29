"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

import { supabase } from "@/lib/supabase";

const authPage = () => {
  // console.log(supabase.from("users").select("user_id, name"));
  const [login, setLogin] = useState<boolean>(true);
  // console.log(login, setLogin);
  return (
    <div>{login ? <SignIn login={login} setLogin={setLogin} /> : <SignUp login={login} setLogin={setLogin} />}</div>
  );
};

export default authPage;
