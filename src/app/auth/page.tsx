"use client";
import React, { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

import { supabase } from "@/lib/supabase";

const authPage = () => {
  console.log(supabase.from("users").select("user_id, name"));
  const [login, setLogin] = useState<boolean>(true);
  return <div>{login ? <SignIn /> : <SignUp />}</div>;
};

export default authPage;
