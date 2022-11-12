import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapComponent = () => {
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
    </MapContainer>
  );
};
