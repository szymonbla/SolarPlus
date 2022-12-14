import { Grid } from "@mui/material";
import { ReadOnlyTextField } from "common/components/Shared";
import { useAppSelector } from "redux/hooks";
import { selectFarmState } from "redux/reducers";

export const SummaryPanel = () => {
  const actualState = useAppSelector(selectFarmState);

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      gap={2}
      sx={{ width: "100%" }}
    >
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        flex={1}
        gap={2}
      >
        <ReadOnlyTextField label="Farm name" value={actualState.farmName} />
        <ReadOnlyTextField
          label="Latitude"
          value={actualState.location?.latitude}
        />
        <ReadOnlyTextField
          label="Longitude"
          value={actualState.location?.longitude}
        />
      </Grid>
      <Grid display="flex" flexDirection="column" flex={1} gap={2}>
        <ReadOnlyTextField
          label="Loss"
          value={`${actualState.pvPanel?.loss}`}
        />
        <ReadOnlyTextField
          label="PeakPower"
          value={`${actualState.pvPanel?.peakPower}` ?? 0}
        />
      </Grid>
    </Grid>
  );
};
