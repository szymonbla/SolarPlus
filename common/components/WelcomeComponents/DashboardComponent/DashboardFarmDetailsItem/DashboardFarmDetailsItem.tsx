import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { FarmModelI } from "types";
import { DDMMYY } from "common/constants";
import { SubmitButton } from "common/components/Form";
import { DashboardTileLayout } from "common/components/Shared";

interface DashboardFarmDetailsItemProps {
  farmDetails?: FarmModelI;
}

export const DashboardFarmDetailsItem = ({
  farmDetails,
}: DashboardFarmDetailsItemProps) => {
  const router = useRouter();

  return (
    <DashboardTileLayout
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      {farmDetails ? (
        <>
          <Typography>
            {cellValue("Farm name", farmDetails.farmName)}
          </Typography>
          <Typography>
            {cellValue("Latitude", farmDetails.location.latitude)}
          </Typography>
          <Typography>
            {cellValue("Longitude", farmDetails.location.longitude)}
          </Typography>
          <Typography>
            {cellValue("Created", moment(farmDetails.created).format(DDMMYY))}
          </Typography>
          <SubmitButton
            label="More details"
            handleClick={() => router.push(`farms/${farmDetails.id}`)}
            sx={{ width: "20%", color: "common.white" }}
          />
        </>
      ) : (
        <Typography>Click on farm to see more details</Typography>
      )}
    </DashboardTileLayout>
  );
};

function cellValue(key: string, value: string | number) {
  return (
    <Grid display="flex" gap={2}>
      <Typography>{key}</Typography>
      <Typography fontWeight={600}>{value}</Typography>
    </Grid>
  );
}
