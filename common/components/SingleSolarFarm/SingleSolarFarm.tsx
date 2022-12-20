import { useCallback, useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { useLazyGetFarmByIdQuery } from "redux/api/v1/farm";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectFarmState, setFarmConfiguration } from "redux/reducers";

import { LoadingSpinner } from "../Loading";
import { InputConfiguration } from "./InputConfiguration";
import { OutputSolarFarm } from "./OutputSolarFarm";
import { SolarFarmChart } from "./SolarFarmChart";
import { FarmModelI } from "types";
import { useCreateProducedFarmEnergyMutation } from "redux/api/v1/energy";
import { useUserAuth } from "common/hooks";
export const SingleSolarFarm = () => {
  const { query, isReady } = useRouter();
  const farmAttributes = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();
  const [fetchFarmByIdTrigger] = useLazyGetFarmByIdQuery();
  const [createProducedFarmEnergyTrigger] =
    useCreateProducedFarmEnergyMutation();

  const dispatchFarmConfiguration = useCallback(
    (farmConfiguration: FarmModelI) => {
      dispatch(setFarmConfiguration(farmConfiguration));
    },
    [dispatch]
  );

  const fetchFarmById = useCallback(async () => {
    const { farmId } = query;
    if (!isReady) return;
    const response = await fetchFarmByIdTrigger(Number(farmId));

    return response.data;
  }, [fetchFarmByIdTrigger, isReady, query]);

  const handleFetching = useCallback(async () => {
    const farm = await fetchFarmById();

    if (!farm) return;

    if (farm.producedFarmEnergy === null) {
      await createProducedFarmEnergyTrigger(farm);
      const farmCOn = await fetchFarmById();

      farmCOn && dispatchFarmConfiguration(farmCOn);
      return;
    } else {
      dispatchFarmConfiguration(farm);
      return;
    }
  }, [
    createProducedFarmEnergyTrigger,
    dispatchFarmConfiguration,
    fetchFarmById,
  ]);

  useEffect(() => {
    handleFetching();
  }, [handleFetching]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{ p: "4rem", width: "100%", height: "100%" }}
    >
      {!query.farmId ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h1" sx={{ mb: "1rem" }}>
            {farmAttributes.farmName}
          </Typography>
          <Grid display="flex" gap={2}>
            <InputConfiguration
              isReadOnly={true}
              farmAttributes={farmAttributes}
            />
            <OutputSolarFarm
              producedEnergy={farmAttributes.producedFarmEnergy}
            />
          </Grid>
          <Grid
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <SolarFarmChart
              monthlyData={farmAttributes.producedFarmEnergy?.monthly ?? []}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
