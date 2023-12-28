"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

const SignIn = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    });
    console.log(data || error);
  }

  return (
    <div>
      <p>로그인</p>
      <form onSubmit={signInWithEmail}>
        <input type="text" onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요." />
        <input type="text" onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요." />
        <button>login</button>
      </form>
    </div>
  );
};

export default SignIn;
