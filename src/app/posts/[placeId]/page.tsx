"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";
import { mockUserData } from "@/data/mockUser";
import React, { useEffect, useState } from "react";
import AvatarCarousel from "./AvatarCarousel";

const PostPage = () => {
  const [selectUserData, setSelectUserData] = useState<User>();
  const onClickAvatar = (data: User) => {
    setSelectUserData(data);
  };
  useEffect(() => {
    setSelectUserData(mockUserData[0]);
  }, []);
  return (
    <>
      <Carousel />

      <div className="container mx-auto">
        <Section title="다녀간 사람들">
          {/* TODO : 카르셀로 유저 리스트 보여주고 클릭하면 바꿔주기 + 마이페이지에서 클릭하면 해당 페이지로 넘어가서 해당 사진이 있는 카르셀 페이지 보여줘야하는데.... 큰일남 */}
          {/* <div className="flex gap-12">
            {mockUserData.map((n, i) => (
              <Avatar
                size="sm"
                src={n.imageUrl.url}
                key={i}
                className="hover:scale-110"
                onClick={() => onClickAvatar(n)}
              />
            ))}
          </div> */}
          <AvatarCarousel avatarList={mockUserData} />
        </Section>
        <Section title="리뷰">
          {!!selectUserData ? (
            <>
              <div className="flex flex-row items-center gap-4 mb-4">
                <Avatar size="sm" src={selectUserData.imageUrl.url} />
                <p className="font-bold min-w-[5rem]">{selectUserData.nickname}</p>
                {/* TODO : 유저가 나인지 아닌지 확인하고 작업 ㄱㄱ */}
                {false ? (
                  <Button size="sm" onClick={() => console.log(1)}>
                    {true ? "팔로우" : "팔로우 중"}
                  </Button>
                ) : (
                  <>
                    <Button size="sm" theme="success" onClick={() => console.log(1)}>
                      수정하기
                    </Button>
                    <Button size="sm" theme="warning" onClick={() => console.log(1)}>
                      삭제하기
                    </Button>
                  </>
                )}
              </div>
              <p className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis saepe in omnis modi, laboriosam, quasi
                facere facilis quod a, consequatur esse sit eos corrupti quaerat mollitia quae quidem quia? Temporibus.
              </p>
            </>
          ) : (
            <></>
          )}
        </Section>
        <Section title="위치">
          <></>
        </Section>
      </div>
    </>
  );
};

export default PostPage;
