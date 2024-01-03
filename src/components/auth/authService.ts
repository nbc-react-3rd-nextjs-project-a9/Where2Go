"use client";
import { supabase } from "@/lib/supabase";

//로그인 상태 확인
async function checkAuth() {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      //로그인 시
      console.log("SIGNED_IN", session?.user.id);
    } else if (event === "SIGNED_OUT") {
      //로그아웃 시
      console.log("SIGNED_OUT", session);
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
  sessionStorage.clear();
  checkAuth();
}

//supabase userinfo 테이블에서 정보 가져와서 userInfoStore에 저장
async function getUserInfo(userId: string) {
  const { data, error } = await supabase.from("userinfo").select().eq("id", userId);
  const fetchData = data![0];
  sessionStorage.setItem("uid", userId);
  sessionStorage.setItem("nickname", fetchData.username);
  sessionStorage.setItem("avatar_url", fetchData.avatar_url);
}

//이메일 형식 유효성 체크
const emailValidChk = (id: string) => {
  const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  if (pattern.test(id) === false) {
    return false;
  } else {
    return true;
  }
};

export { checkAuth, signInWithKakao, signOut, getUserInfo, emailValidChk };
