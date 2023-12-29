import Script from "next/script";
import React from "react";
import PlacesSearch from "@/components/map/PlacesSearch";
import MapContainer from "@/components/map/MapContainer";

const page = () => {
  return (
    <div className="container m-auto">
      <MapContainer lat={33.5563} lng={126.79581} />
      <PlacesSearch />
    </div>
  );
};

export default page;
