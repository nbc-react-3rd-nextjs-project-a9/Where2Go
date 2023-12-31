"use client";

import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import LoginModal from "./LoginModal";

import useModalStore from "@/store/modalStore";
import useLogedInStore from "@/store/logedInStore";
import { getUserInfo, signOut } from "./authService";

interface Props {
  logout: () => void;
}

const AuthMenu = ({ logout }: Props) => {
  // const userId = "123";
  // const liClassName = "px-4 py-2 text-sm hover:bg-gray-300";
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const liClassName = "text-sm hover:bg-gray-300";
  return (
    <ul className="absolute mt-4 text-black text-start w-full z-20 top-full  right-0 bg-white rounded-md divide-y divide-divide-solid border-2 border-gray-300 cursor-pointer">
      <li className={`${liClassName}`}>
        <Link href={`/user/${userId}`} className="block px-4 py-2 ">
          마이페이지
        </Link>
      </li>
      <li className={`${liClassName}`}>
        <Link href={"/form"} className="block px-4 py-2 ">
          리뷰 작성하기
        </Link>
      </li>
      <li
        className={`${liClassName} block px-4 py-2 `}
        onClick={() => {
          logout();
          signOut();
        }}
      >
        로그아웃
      </li>
    </ul>
  );
};

const logedInCheck = async (setLogedIn: (state: boolean) => void) => {
  const { data, error } = await supabase.auth.getSession();
  if (data.session !== null) {
    setLogedIn(true);
    getUserInfo(data.session.user.id);
  }
};

const UserAuthBtn = () => {
  const [login, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  //모달상태 store
  const { open, setOpen } = useModalStore();

  const { logedIn, setLogedIn } = useLogedInStore();

  const handleLogOut = () => {
    setLogedIn(false);
  };
  useEffect(() => {
    logedInCheck(setLogedIn);

    if (!openMenu) return;
    const closeMenu = () => setOpenMenu(false);

    const closeMenuTimer = setTimeout(() => {
      window.addEventListener("click", closeMenu);
    }, 200);

    return () => {
      clearTimeout(closeMenuTimer);
      window.removeEventListener("click", closeMenu);
    };
  }, [openMenu]);

  // const avatar = sessionStorage.getItem("avatar_url");

  return (
    <>
      <LoginModal />
      <div className="relative min-w-[10rem] flex justify-end">
        {logedIn ? (
          sessionStorage.getItem("avatar_url") === "null" ? (
            <Avatar size="sm" onClick={() => setOpenMenu(true)} />
          ) : (
            <Avatar src={sessionStorage.getItem("avatar_url")} size="sm" onClick={() => setOpenMenu(true)} />
          )
        ) : (
          <Button
            onClick={() => {
              // setLogin(true);
              setOpen(true);
            }}
          >
            로그인
          </Button>
        )}
        {openMenu && <AuthMenu logout={handleLogOut} />}
      </div>
    </>
  );
};

export default UserAuthBtn;
