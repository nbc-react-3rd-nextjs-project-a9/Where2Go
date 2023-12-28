"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";
import { mockUserData } from "@/data/mockUser";
import React, { useEffect, useState } from "react";

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
          <div className="flex gap-4">
            {mockUserData.map((n, i) => (
              <Avatar size="sm" src={n.imageUrl.url} key={i} onClick={() => onClickAvatar(n)} />
            ))}
          </div>
        </Section>
        <Section title="리뷰">
          {!!selectUserData ? (
            <>
              <div className="flex flex-row items-center gap-4 mb-4">
                <Avatar size="sm" src={selectUserData.imageUrl.url} />
                <p className="font-bold">{selectUserData.nickname}</p>
                <Button size="sm" onClick={() => console.log(1)}>
                  팔로우 중
                </Button>
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
