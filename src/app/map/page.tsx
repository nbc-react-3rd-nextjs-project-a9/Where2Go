import Script from "next/script";
import React from "react";
import MapContainer from "./MapContainer";
import SearchMap from "./SearchMap";

const page = () => {
  return (
    <div>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <MapContainer lat={33.5563} lng={126.79581} />
      <SearchMap />
    </div>
  );
};

export default page;
