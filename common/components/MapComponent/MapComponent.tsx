import { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties } from "@emotion/serialize";
import { CENTER_LAT, CENTER_LON } from "common/constants";

interface MapComponentProps {
  children?: ReactNode;
  style?: CSSProperties | undefined;
}
export const MapComponent = ({ children, style }: MapComponentProps) => {
  return (
    <MapContainer
      center={[CENTER_LAT, CENTER_LON]}
      zoom={3}
      scrollWheelZoom={true}
      style={{ height: "100%", borderRadius: 12, cursor: "crosshair" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};
