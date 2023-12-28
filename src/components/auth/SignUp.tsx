"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";

const SignUp = () => {
  //입력받은 이메일, 패스워드, 닉네임
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

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
    setId("");
    setPw("");
    setPwCheck("");
    setNickname("");
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-8 border-solid border-2 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">회원가입</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={signUpNewUser}>
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

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="pwConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                    Password 확인
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
                  <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="nickname"
                    name="nickname"
                    type="nickname"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="  where2go에서 사용할 이름을 입력하세요"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" size="md" className="sm:mx-auto sm:w-full sm:max-w-sm mb-8 mt-2">
                  SignUp
                </Button>
              </div>
            </form>

            <div>
              <p className="mt-4 text-center text-sm text-gray-500">로그인 하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
