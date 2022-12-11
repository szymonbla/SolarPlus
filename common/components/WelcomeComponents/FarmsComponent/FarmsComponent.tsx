import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { FarmsTable } from "./FarmsTable";
import { FarmModelI } from "types";
import { FarmActionBar } from "./FarmActionBar";

export const FarmsComponent = () => {
  const [allSolarFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [inEditFarm, setEditFarm] = useState<boolean>(false);
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
      <Grid display="flex" justifyContent="space-between">
        <Typography variant="h3" fontWeight="600">
          All solar farms
        </Typography>
        <FarmActionBar
          selectedFarmIndex={selectionModel}
          inEdit={inEditFarm}
          setEdit={setEditFarm}
        />
      </Grid>
      <FarmsTable
        rows={allSolarFarms}
        selectionModel={selectionModel}
        editable={inEditFarm}
        setSelectionModel={setSelectionModel}
      />
    </Grid>
  );
};
