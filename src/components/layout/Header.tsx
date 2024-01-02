import React from "react";
import UserAuthBtn from "../auth/UserAuthBtn";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" bg-purple-900 py-2 text-white font-bold mb-8 sticky top-0 z-40 shadow-md">
      <div className="container m-auto flex flex-row items-center max-w-[1200px] min-h-[48px] w-[90%]">
        <nav className="flex flex-row gap-2">
          <Link href={"/"} className="mr-8">
            <Image src="/images/where2go_logo.jpeg" width={180} height={100} alt="logo" />
          </Link>
          <Link href={"/map"}>지도</Link>
          <Link href={"/form"}>폼</Link>
        </nav>

        <div className="ml-auto ">
          <UserAuthBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
