"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

import { signInWithKakao, signOut } from "./authService";

const SignUp = () => {
  //입력받은 이메일, 패스워드, 닉네임
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");

  async function signUpNewUser(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: id,
      password: pw,
      options: {
        // emailRedirectTo: "https//example.com/welcome"
      }
    });
    console.log(data || error);
  }

  return (
    <div>
      <button onClick={signInWithKakao}>카카오로그인하기</button>
      <button onClick={signOut}>로그아웃</button>
      <form onSubmit={signUpNewUser}>
        <p>회원가입</p>
        <input type="text" onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요." />
        <input type="text" onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요." />
        <input type="text" onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력하세요." />

        <button>submit</button>
      </form>
    </div>
  );
};

export default SignUp;
