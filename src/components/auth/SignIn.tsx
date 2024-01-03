"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { signInWithKakao, checkAuth, getUserInfo, emailValidChk } from "./authService";
import Button from "@/components/Button";
import { VscChromeClose } from "react-icons/vsc";
import useLogedInStore from "@/store/logedInStore";

interface Props {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: (state: boolean) => void;
}

const SignIn = ({ login, setLogin, setOpen }: Props) => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const isValid = emailValidChk(id) && pw.length > 5 ? false : true;

  const { setLogedIn } = useLogedInStore();

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    });

    checkAuth();

    //로컬스토리지에 저장되는 user 정보에서 uid 가져오기
    // let userInfo = JSON.parse(localStorage.getItem("sb-fatcfzssyzoiskrplehv-auth-token") || "");
    let userInfo = JSON.parse(localStorage.getItem("sb-cojgljiqpitvuwdvnmgf-auth-token") || "");

    //userInfoStore에 유저 정보 저장
    getUserInfo(userInfo.user.id || "");
    setOpen(false);
    setLogedIn(true);
  };

  return (
    <div className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-8 border-solid border-2 ">
        <div onClick={() => setOpen(false)} className="mb-2">
          <VscChromeClose className="ml-[300px] cursor-pointer" color="black" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인하고
            <br />
            멋진 장소를 공유하세요
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setId(e.target.value)}
                  placeholder="  example@where2go.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="  비밀번호를 입력하세요."
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Button
                onClick={signInWithEmail}
                type="submit"
                size="md"
                className="sm:mx-auto sm:w-full sm:max-w-sm mb-4 mt-2"
                disabled={isValid}
              >
                login
              </Button>

              <button type="button" className="text-center" onClick={signInWithKakao}>
                <img src="/images/kakao_login.png" className="w-full" />
              </button>
            </div>
          </form>

          <div>
            <p onClick={() => setLogin(!login)} className="mb-6 mt-8 text-center text-sm text-gray-500 cursor-pointer">
              회원가입 하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
