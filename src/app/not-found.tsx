import Script from "next/script";
import React from "react";

const NotFound = () => {
  return (
    <div>
      not-found
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default NotFound;
