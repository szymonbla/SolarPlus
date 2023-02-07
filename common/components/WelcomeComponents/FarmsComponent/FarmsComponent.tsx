import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import {
  useDeleteFarmByIdMutation,
  useLazyGetAllFarmsQuery,
} from "redux/api/v1/farm";
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
  const [deleteSolarFarmTrigger] = useDeleteFarmByIdMutation();
  const farmToEditIndex = Number(selectionModel[0]) ?? 0;
  const farmToEdit = allSolarFarms.find((farm) => farm.id === farmToEditIndex);

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  const deleteSolarFarmById = useCallback(async () => {
    allSolarFarms.length > 0 &&
      (await deleteSolarFarmTrigger(farmToEdit?.id ?? 0));
  }, [allSolarFarms.length, deleteSolarFarmTrigger, farmToEdit?.id]);

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
      {allSolarFarms.length > 0 && isInEditFarm ? (
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
          deleteSolarFarmById={deleteSolarFarmById}
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
