"use client";
import React, { useEffect } from "react";
import PlacesSearch from "@/components/map/PlacesSearch";
import MapContainer from "@/components/map/MapContainer";
import useGeolocation from "react-hook-geolocation";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlaceData } from "@/api/places";
import Follow from "@/components/Follow";

const page = () => {
  const { data } = useQuery({ queryKey: ["places"], queryFn: getPlaceData });

  console.log("data", data);

  const geoLocation = useGeolocation();
  if (geoLocation.error) {
    alert("사용자 위치를 확인할 수 없습니다.");
  }
  const latlng = { lat: geoLocation.latitude, lng: geoLocation.longitude };
  const { lat, lng } = latlng;
  // data의 lat, lng값 읽어오기
  const dataLat = 37.566826;
  const dataLng = 126.9786567;
  // lat, lng값과 사용자의 lat, lng값과의 거리 차이를 계산해서
  const x = lat - dataLat;
  const y = lng - dataLng;
  const distance = Math.sqrt(x * x + y * y);
  console.log("distance", distance);
  // data별 distance[, ]
  // 거리순 카드 렌더링 시 정렬해서 렌더링
  return (
    <div className="">
      <MapContainer lat={geoLocation.latitude} lng={geoLocation.longitude} />
      <PlacesSearch />
    </div>
  );
};

export default page;
