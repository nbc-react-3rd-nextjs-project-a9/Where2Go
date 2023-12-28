import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-purple-900 py-4 text-white font-bold mb-8">
      <div className="container m-auto flex flex-row max-w-[1200px] w-[90%]">
        <nav className="flex flex-row gap-2">
          <Link href={"/"} className="mr-8">
            로고
          </Link>
          <Link href={"/map"}>지도</Link>
          <Link href={"/auth"}>로그인</Link>
          <Link href={"/form"}>폼</Link>
        </nav>

        <div className="ml-auto ">login</div>
      </div>
    </header>
  );
};

export default Header;
