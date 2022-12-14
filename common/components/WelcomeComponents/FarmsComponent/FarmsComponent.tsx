import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { FarmsTable } from "./FarmsTable";
import { FarmModelI } from "types";
import { FarmActionBar } from "./FarmActionBar";
import { EditFarmModal } from "common/components/Modals/EditFarmModal";
import { CreationFarm } from "common/components/Modals";

export const FarmsComponent = () => {
  const [allSolarFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [isInEditFarm, setIsInEditFarm] = useState<boolean>(false);
  const [fetchSolarFarmsTrigger, { data: solarData }] =
    useLazyGetAllFarmsQuery();
  const farmToEditIndex = Number(selectionModel[0]) ?? 0;
  const farmToEdit = allSolarFarms.find((farm) => farm.id === farmToEditIndex);

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    console.log("again");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms, solarData]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      sx={{ height: "100%", p: "4rem" }}
      gap={2}
    >
      {isInEditFarm ? (
        <EditFarmModal
          setIsInEditFarm={setIsInEditFarm}
          solarFarm={farmToEdit}
        />
      ) : (
        <CreationFarm />
      )}
      <Grid display="flex" justifyContent="space-between">
        <Typography variant="h3" fontWeight="600">
          All solar farms
        </Typography>
        <FarmActionBar
          selectedFarmIndex={selectionModel}
          inEdit={isInEditFarm}
          setEdit={setIsInEditFarm}
        />
      </Grid>
      <FarmsTable
        rows={allSolarFarms}
        selectionModel={selectionModel}
        editable={isInEditFarm}
        setSelectionModel={setSelectionModel}
      />
    </Grid>
  );
};
