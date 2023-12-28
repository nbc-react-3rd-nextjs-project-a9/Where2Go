"use client";

import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface markers {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string;
}

const SearchMap = () => {
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<markers[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [addressName, setAddressName] = useState<string>("");

  const searchBtnHandler = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchLocation, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색 장소가 몇 개 이상일 때 자세한 주소를 입력해달라 띄울지
        const bounds = new kakao.maps.LatLngBounds();
        console.log("data", data);
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x)
            },
            content: data[i].place_name,
            address: data[i].address_name
          });

          bounds.extend(new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };
  console.log("info", info);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchBtnHandler();
        }}
      >
        <input value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
        <button type="submit">검색하기</button>
      </form>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: "100%",
          height: "350px"
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setInfo(marker);
              setAddressName(marker.address);
            }}
          >
            {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
      <p>{addressName}</p>
    </div>
  );
};

export default SearchMap;
