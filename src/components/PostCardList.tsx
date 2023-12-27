import Link from "next/link";
import React from "react";

interface PostCardProps {
  postId: string;
}

const PostCard = ({ postId }: PostCardProps) => {
  return (
    <Link href={`/posts/${postId}`}>
      <div className="w-[18rem] h-[24rem] border-purple-900  border-2 rounded-lg">카드</div>
    </Link>
  );
};

const PostCardList = () => {
  // TODO : post card List 목데이터 만들어서 추가하기
  // TODO : 미디어 쿼리 적용해서 1개 남았을 땐 li 태그에 mx-auto 붙여주기
  const testData = ["1", "2", "3", "4"];
  return (
    <div>
      <ul className="flex flex-wrap justify-between gap-12">
        {testData.map((n, i) => (
          <li key={`testPostCard-${i}`} className="">
            <PostCard postId={n} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCardList;
