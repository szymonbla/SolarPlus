import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import { Marker, Popup } from "react-leaflet";
import { Button, Typography } from "@mui/material";
import { icon } from "leaflet";

import { FarmModelI } from "types";
import { LoadingSpinner } from "common/components/Loading";
import "leaflet/dist/leaflet.css";

interface DashboardMapProps {
  allSolarFarms: FarmModelI[];
  setSelectedSolarFarm: Dispatch<SetStateAction<FarmModelI | undefined>>;
}
const MapComponent = dynamic(
  () =>
    import("common/components/MapComponent/MapComponent").then(
      (item) => item.MapComponent
    ),
  { ssr: false, loading: () => <LoadingSpinner /> }
);

const ICON = icon({
  iconUrl: "/images/markerIcon.svg",
  iconSize: [32, 32],
});

export const DashboardMap = ({
  allSolarFarms,
  setSelectedSolarFarm,
}: DashboardMapProps) => {
  return (
    <MapComponent>
      <Typography>test</Typography>
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
    </MapComponent>
  );
};
