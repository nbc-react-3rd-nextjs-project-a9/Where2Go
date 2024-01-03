"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import { VscChromeClose } from "react-icons/vsc";
import useLogedInStore from "@/store/logedInStore";
import { emailValidChk } from "./authService";

interface Props {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: (state: boolean) => void;
}

const SignUp = ({ login, setLogin, setOpen }: Props) => {
  //입력받은 이메일, 패스워드, 닉네임
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { setLogedIn } = useLogedInStore();

  const pwValid = pwCheck !== "" && pw === pwCheck ? true : false;
  const isValid = pwValid && emailValidChk(id) && pw.length > 5 && name !== "" ? false : true;

  async function getUserInfo(userId: string, nickname: string, avatar_url: string) {
    sessionStorage.setItem("uid", userId);
    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("avatar_url", avatar_url);
  }

  async function signUpNewUser(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: id,
      password: pw,
      options: {
        data: {
          user_name: name,
          avatar_url: null
        }
      }
    });

    console.log(data.user || error);
    const uid = data.user?.id;
    getUserInfo(uid || "", name, "");
    setOpen(false);
    setLogedIn(true);
    setLogin(!login);
  }

  return (
    <div className="absolute bg-white top-24 left-1/2 -translate-x-1/2 translate-y-0.5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-8 border-solid border-2 ">
        <div onClick={() => setOpen(false)} className="mb-2 cursor-pointer">
          <VscChromeClose className="ml-[300px]" color="black" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">회원가입</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signUpNewUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address{" "}
                {emailValidChk(id) ? (
                  <span>✅</span>
                ) : (
                  <span className="text-xs text-red-600"> 이메일 형식이 유효하지 않습니다.</span>
                )}
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
                  Password{" "}
                  {pw.length < 6 ? (
                    <span className="text-xs text-red-600"> 6자리 이상 입력하세요</span>
                  ) : (
                    <span> ✅</span>
                  )}
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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="pwConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Password 확인{" "}
                  {!pwValid ? (
                    <span className="text-xs text-red-600">비밀번호가 일치하지 않습니다.</span>
                  ) : (
                    <span>✅</span>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="pwConfirm"
                  name="pwConfirm"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPwCheck(e.target.value)}
                  placeholder="  비밀번호 재입력"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="  where2go에서 사용할 이름을 입력하세요"
                />
              </div>
            </div>

            <div>
              <Button type="submit" size="md" disabled={isValid} className="sm:mx-auto sm:w-full sm:max-w-sm mb-8 mt-2">
                SignUp & Login
              </Button>
            </div>
          </form>

          <div>
            <p onClick={() => setLogin(!login)} className="mb-6 text-center text-sm text-gray-500 cursor-pointer">
              로그인 하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
