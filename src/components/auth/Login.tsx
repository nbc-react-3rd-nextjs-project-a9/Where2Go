"use client";
import React, { useState } from "react";

import { signInWithKakao, signOut } from "./authService";

const Login = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  console.log(id);
  return (
    <div>
      {/* <button onClick={signInWithKakao}>Login</button>
      <button onClick={signOut}>Logout</button> */}
      <input type="text" onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요." />
      <input type="text" onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요." />
    </div>
  );
};

export default Login;
