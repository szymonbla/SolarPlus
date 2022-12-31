import { Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { Marker, useMapEvents } from "react-leaflet";
import { icon, LatLng } from "leaflet";
import { GlobalModal } from "../GlobalModal";
import { LoadingSpinner } from "common/components/Loading";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectFarmState, setFarmConfiguration } from "redux/reducers";
import { Grid, Typography } from "@mui/material";
import { ButtonWithIcon } from "common/components/Shared";
import { CENTER_LAT, CENTER_LON } from "common/constants";
import ConfirmIcon from "common/images/confirm.svg";

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

interface MapModalProps {
  setIsSelectionByMap: Dispatch<SetStateAction<boolean>>;
  handleLogic?: (latLangUserChoice: LatLng | undefined) => void;
}

export const MapModal = ({
  setIsSelectionByMap,
  handleLogic,
}: MapModalProps) => {
  const actualState = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();
  const [latLangUserChoice, setLatLangUserChoice] = useState<LatLng>();

  const handleCloseModal = () => {
    handleLogic
      ? handleLogic(latLangUserChoice)
      : dispatch(
          setFarmConfiguration({
            ...actualState,
            location: {
              latitude: latLangUserChoice?.lat.toFixed(4) ?? "",
              longitude: latLangUserChoice?.lng.toFixed(4) ?? "",
            },
          })
        );

    setIsSelectionByMap(false);
  };

  return (
    <GlobalModal>
      <Grid sx={{ height: "90%" }}>
        <MapComponent>
          <LocationMarker
            latLangUserChoice={latLangUserChoice}
            setLatLangUserChoice={setLatLangUserChoice}
          />
        </MapComponent>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        sx={{ height: "10%" }}
      >
        <Typography fontWeight={600}>Choose solar farm location</Typography>
        <Typography>
          {cellValue(
            "Latitude",
            latLangUserChoice?.lat.toFixed(4) ?? CENTER_LAT
          )}
        </Typography>
        <Typography>
          {cellValue(
            "Longitude",
            latLangUserChoice?.lng.toFixed(4) ?? CENTER_LON
          )}
        </Typography>
        <ButtonWithIcon
          label="Accept"
          icon={ConfirmIcon}
          handleClick={handleCloseModal}
          sx={{
            backgroundColor: "success.300",
            "&:hover": { backgroundColor: "success.main" },
          }}
        />
      </Grid>
    </GlobalModal>
  );
};

interface LocationMarkerProps {
  latLangUserChoice: LatLng | undefined;
  setLatLangUserChoice: Dispatch<SetStateAction<LatLng | undefined>>;
}

function LocationMarker({
  latLangUserChoice,
  setLatLangUserChoice,
}: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setLatLangUserChoice(e.latlng);
    },
  });

  return (
    <Marker
      position={{
        lat: latLangUserChoice?.lat
          ? Number(latLangUserChoice?.lat.toFixed(4))
          : CENTER_LAT,
        lng: latLangUserChoice?.lng
          ? Number(latLangUserChoice?.lng.toFixed(4))
          : CENTER_LON,
      }}
      icon={ICON}
      interactive={true}
    ></Marker>
  );
}

function cellValue(key: string, value: string | number) {
  return (
    <Grid display="flex" gap={2}>
      <Typography>{key}</Typography>
      <Typography fontWeight={600}>{value}</Typography>
    </Grid>
  );
}
