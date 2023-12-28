"use client";
import { supabase } from "@/lib/supabase";

//카카오 로그인
async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao"
  });
  // sessionStorage.setItem("test", JSON.stringify(data));
}

//로그아웃
async function signOut() {
  const { error } = await supabase.auth.signOut();
  alert("logout 성공");
}

export { signInWithKakao, signOut };
