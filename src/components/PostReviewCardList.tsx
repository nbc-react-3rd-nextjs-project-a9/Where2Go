import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  placeReviewList: PlaceReview[] | undefined | null;
}

interface PostReviewCardProps {
  placeData: PlaceReview;
}
const PostReviewCard = ({ placeData }: PostReviewCardProps) => {
  const [placeId, setPlaceId] = useState("");
  const [address, setAddress] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const { userId } = useParams();
  useEffect(() => {
    const fetchPlaceId = async () => {
      const { data } = await supabase.from("places").select().eq("placeName", placeData.placeName).single();
      const { data: publicUrl } = supabase.storage.from("placeReviewImg").getPublicUrl(placeData.imageUrlList[0]);
      console.log("placeId", data?.placeId);
      console.log("address", data?.address);
      console.log("publicUrl", publicUrl);
      setPlaceId(data?.placeId);
      setAddress(data?.address);
      setPublicUrl(publicUrl.publicUrl);
    };
    fetchPlaceId();
  }, []);

  return (
    <Link href={`/posts/${placeId}/${userId}`}>
      <div className="relative w-[12rem] h-[16rem]  mx-auto transition-all ring-2 ring-gray-100 rounded-lg  overflow-hidden shadow-md hover:ring-4 hover:ring-purple-500 ">
        <Image src={publicUrl} alt="Picture of the author" fill={true} sizes="12rem" />
        <div className="absolute h-[4rem]  w-full bottom-0 p-2  text-white bg-black bg-opacity-25 backdrop-blur-sm">
          <p className="font-bold text-md whitespace-nowrap text-ellipsis overflow-hidden">{placeData.placeName}</p>
          <p className=" text-xs mt-1 whitespace-nowrap text-ellipsis overflow-hidden">{address}</p>
        </div>
      </div>
    </Link>
  );
};

const PostReviewCardList = ({ placeReviewList }: Props) => {
  return (
    <div>
      <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  grid-cols-2  gap-y-4">
        {placeReviewList?.map((n, i) => (
          <li key={`PostReviewCard-${i}`} className="">
            <PostReviewCard placeData={n} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PostReviewCardList;
