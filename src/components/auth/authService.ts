"use client";
import { supabase } from "@/lib/supabase";

//로그인 상태 확인
function checkAuth() {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      //로그인 시
      console.log("SIGNED_IN", session?.user.id);
      sessionStorage.setItem("uid", session?.user.id);
    } else if (event === "SIGNED_OUT") {
      //로그아웃 시
      console.log("SIGNED_OUT", session);
      sessionStorage.removeItem("uid");
    }
  });
}

//카카오 로그인
async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao"
  });
  checkAuth();
}

//로그아웃
async function signOut() {
  const { error } = await supabase.auth.signOut();
  checkAuth();
}

export { checkAuth, signInWithKakao, signOut };
