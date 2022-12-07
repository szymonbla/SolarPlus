import { Dispatch, SetStateAction } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { Button } from "@mui/material";
import "leaflet/dist/leaflet.css";

import { FarmModelI } from "types";

const ICON = icon({
  iconUrl: "/images/markerIcon.svg",
  iconSize: [32, 32],
});

interface MapComponentProps {
  allSolarFarms: FarmModelI[];
  setSelectedSolarFarm: Dispatch<SetStateAction<FarmModelI | undefined>>;
}

export const MapComponent = ({
  allSolarFarms,
  setSelectedSolarFarm,
}: MapComponentProps) => {
  const CENTER_LAT = 40.8667;
  const CENTER_LON = 34.566;

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
      {allSolarFarms.map((solarFarm) => (
        <Marker
          position={[
            Number(solarFarm.location.latitude),
            Number(solarFarm.location.longitude),
          ]}
          icon={ICON}
          key={solarFarm.farmName}
        >
          <Popup>
            <Button onClick={() => setSelectedSolarFarm(solarFarm)}>
              View
            </Button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
