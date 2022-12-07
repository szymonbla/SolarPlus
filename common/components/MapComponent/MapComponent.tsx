import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { FarmModelI } from "types";

const ICON = icon({
  iconUrl: "/images/markerIcon.svg",
  iconSize: [32, 32],
});
export const MapComponent = () => {
  const CENTER_LAT = 40.866667;
  const CENTER_LON = 34.56666;
  const [allFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [fetchSolarFarmsTrigger] = useLazyGetAllFarmsQuery();

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms]);

  return (
    <MapContainer
      center={[CENTER_LAT, CENTER_LON]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: "100%", borderRadius: 12 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {allFarms.map(({ farmName, location, id }) => (
        <Marker
          position={[Number(location.latitude), Number(location.longitude)]}
          icon={ICON}
          key={farmName}
        >
          <Popup>
            Farm name: {farmName} <Link href={`/farms/${id}`}>Details</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
