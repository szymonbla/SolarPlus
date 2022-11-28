import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { icon } from "leaflet";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { useCallback, useEffect, useState } from "react";
import { FarmModelI } from "types";
import Link from "next/link";

const ICON = icon({
  iconUrl: "/images/markerIcon.svg",
  iconSize: [32, 32],
});
export const MapComponent = () => {
  const position = [51.505, -0.09];
  const [fetchSolarFarmsTrigger, { data }] = useLazyGetAllFarmsQuery();
  const [allFarms, setAllFarms] = useState<FarmModelI[]>([]);

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms]);

  return (
    <MapContainer
      center={[40.866667, 34.56666]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allFarms.map((farm) => (
        <Marker
          position={[
            Number(farm.location.latitude),
            Number(farm.location.longitude),
          ]}
          icon={ICON}
          key={farm.farmName}
        >
          <Popup>
            Farm name: {farm.farmName}{" "}
            <Link href={`/farms/${farm.id}`}>Details</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
