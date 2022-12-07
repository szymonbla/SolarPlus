import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { FarmsTable } from "./FarmsTable";
import { FarmModelI } from "types";

export const FarmsComponent = () => {
  const [allSolarFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [fetchSolarFarmsTrigger] = useLazyGetAllFarmsQuery();

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      sx={{ height: "100%", p: "4rem" }}
      gap={2}
    >
      <Typography variant="h3" fontWeight="600">
        All solar farms
      </Typography>
      <FarmsTable
        rows={allSolarFarms}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Grid>
  );
};
