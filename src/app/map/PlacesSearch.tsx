"use client";

import { supabase } from "@/lib/supabase";
import useMapStore from "@/store/store";
import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type position = {
  lat: number;
  lng: number;
};

interface Marker {
  position: position;
  content: string;
  address: string;
  placeName: string;
}

// type info = Partial<Marker>;

const PlacesSearch = () => {
  // const [info, setInfo] = useState<info>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [addressName, setAddressName] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const setInfo = useMapStore((state) => state.setInfo);
  const info = useMapStore((state) => state.info);
  // search keyword를 받아 키워드에 맞는 marker array를 반환

  const searchLocations = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
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
            address: data[i].address_name,
            placeName: data[i].place_name
          });

          bounds.extend(new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  const markerClickHandler = (address: string, placeName: string) => {
    setAddressName(address);
    setPlaceName(placeName);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchLocations();
  };

  // const addData = async (latlng: position, placeName: string, addressName: string) => {
  //   const { error } = await supabase
  //     .from("place")
  //     .insert({ placeName: placeName, location: latlng, address: addressName });
  //   if (error) {
  //     console.log("error", error);
  //   }
  // };

  // const infoWindowHandler = () => {
  //   setIsInfoWindowOpen(!infoWindowHandler);
  // };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        <button type="submit">검색하기</button>
      </form>
      <Map
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
              markerClickHandler(marker.address, marker.placeName);
            }}
          >
            {/* {!isInfoWindowOpen && info && info.content === marker.content && (
              <div style={{ color: "#000" }} onClick={infoWindowHandler}>
                {marker.content}
              </div>
            )} */}
          </MapMarker>
        ))}
      </Map>
      <p>이름: {placeName}</p>
      <p>주소: {addressName}</p>
      {/* <button type="button" onClick={() => addData(latlng, placeName, addressName)}>
        등록하기
      </button> */}
    </div>
  );
};

export default PlacesSearch;
