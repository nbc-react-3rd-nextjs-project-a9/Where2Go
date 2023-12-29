"use client";

import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import Link from "next/link";

interface Props {
  logout: () => void;
}

const AuthMenu = ({ logout }: Props) => {
  const userId = "123";
  const liClassName = "px-4 py-2 text-sm hover:bg-gray-300";
  return (
    <ul className="absolute mt-4 text-black text-start w-full z-20 top-full  right-0 bg-white rounded-md divide-y divide-divide-solid border-2 border-gray-300 cursor-pointer">
      <li className={`${liClassName}`}>
        <Link href={`/user/${userId}`}>마이페이지</Link>
      </li>
      <li className={`${liClassName}`}>
        <Link href={"/form"}>리뷰 작성하기</Link>
      </li>
      <li
        className={`${liClassName}`}
        onClick={() => {
          console.log("로그아웃 동작");
          logout();
        }}
      >
        로그아웃
      </li>
    </ul>
  );
};

const UserAuthBtn = () => {
  const [login, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogOut = () => {
    setLogin(false);
  };
  useEffect(() => {
    if (!openMenu) return;
    const closeMenu = () => setOpenMenu(false);

    const closeMenuTimer = setTimeout(() => {
      window.addEventListener("click", closeMenu);
    });

    return () => {
      clearTimeout(closeMenuTimer);
      window.removeEventListener("click", closeMenu);
    };
  }, [openMenu]);
  return (
    <>
      <div className="relative min-w-[10rem]">
        {login ? (
          <Avatar size="sm" onClick={() => setOpenMenu(true)} />
        ) : (
          <Button
            onClick={() => {
              setLogin(true);
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
