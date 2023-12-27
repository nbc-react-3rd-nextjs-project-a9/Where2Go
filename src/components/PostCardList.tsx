import Link from "next/link";
import React from "react";

interface PostCardProps {
  data: Place;
}

// TODO : type 제대로 하기
interface PostCardListProps {
  placeList: Place[];
}

const PostCard = ({ data }: PostCardProps) => {
  return (
    <Link href={`/posts/${data.placeId}`}>
      <div
        className={`w-[18rem] h-[24rem] border-purple-900  border-2 rounded-lg bg-center relative`}
        style={{ backgroundImage: `url(${data.imageUrl.url})` }}
      >
        <div className="absolute h-[5rem]  w-full bottom-0 px-4 py-4  text-white bg-black bg-opacity-25 backdrop-blur-sm">
          <h4 className="font-bold text-lg">{data.placeName}</h4>
          <p className=" text-sm mt-1">{data.address}</p>
        </div>
        카드
      </div>
    </Link>
  );
};

const PostCardList = ({ placeList }: PostCardListProps) => {
  // TODO : post card List 목데이터 만들어서 추가하기
  // TODO : 미디어 쿼리 적용해서 1개 남았을 땐 li 태그에 mx-auto 붙여주기
  const testData = ["1", "2", "3", "4"];

  return (
    <div>
      <ul className="flex flex-wrap justify-between gap-12">
        {placeList.map((n, i) => (
          <li key={`testPostCard-${i}`} className="">
            <PostCard data={n} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCardList;
