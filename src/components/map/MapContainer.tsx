import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapContainer = ({ lat, lng }: { lat: number; lng: number }) => {
  // props로 lat, lng 정보 받기
  return (
    <Map center={{ lat, lng }} style={{ width: "100%", height: "360px" }}>
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
};

export default MapContainer;
