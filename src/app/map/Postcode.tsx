"use client";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import SearchMap from "./SearchMap";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface markers {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const Postcode = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);

  const [address, setAddress] = useState<string>("");
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<markers[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();

  const completeHandler = (data: any) => {
    const { address } = data;
    setAddress(address);
    searchBtnHandler(address);
  };

  const closeHandler = (state: any) => {
    if (state === "FORCE_CLOSE") {
      setIsToggleOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsToggleOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsToggleOpen((prevOpenState) => !prevOpenState);
  };

  const searchBtnHandler = (address: string) => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(address, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        let markers = [];

        markers.push({
          position: {
            lat: Number(data[0].y),
            lng: Number(data[0].x)
          },
          content: data[0].place_name
        });
        bounds.extend(new kakao.maps.LatLng(Number(data[0].y), Number(data[0].x)));

        // for (let i = 0; i < data.length; i++) {
        //   markers.push({
        //     position: {
        //       lat: Number(data[i].y),
        //       lng: Number(data[i].x)
        //     },
        //     content: data[i].place_name
        //   });

        //   bounds.extend(new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)));
        // }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  return (
    <div>
      <div>
        <div>
          <button type="button" onClick={toggleHandler}>
            주소 검색
          </button>
        </div>
        {isToggleOpen && (
          <div>
            <DaumPostcodeEmbed onComplete={completeHandler} onClose={closeHandler} />
          </div>
        )}
        <div>{address}</div>
      </div>
      <div>
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
                setIsInfoWindowOpen((prev) => !prev);
              }}
            >
              {info && isInfoWindowOpen && info.content === marker.content && (
                <div className="flex justify-center content-center" onClick={() => setIsInfoWindowOpen(false)}>
                  <p>{marker.content}</p>
                </div>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default Postcode;
