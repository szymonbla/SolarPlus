import { Grid, Typography } from "@mui/material";
import {
  useLazyGetFarmByIdQuery,
  useLazyGetProducedEnergyByFarmIdQuery,
} from "redux/api/v1/farm";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading";
import { InputConfiguration } from "./InputConfiguration";
import { selectFarmState, setFarmConfiguration } from "redux/reducers";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { OutputSolarFarm } from "./OutputSolarFarm";
import { ProducedEnergy } from "types/farmEnergy";

export const SingleSolarFarm = () => {
  const [state, setState] = useState<ProducedEnergy>({
    yearlyInPlaneIrradiationKWM2: 0,
    yearlyPVEnergyProductionKWH: 0,
    yearToYearVariabilityKWH: 0,
  });
  const farmAttributes = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();
  const { query, isReady } = useRouter();

  const [fetchFarmByIdTrigger] = useLazyGetFarmByIdQuery();
  const [fetchProducedEnergyByFarmTrigger] =
    useLazyGetProducedEnergyByFarmIdQuery();

  const fetchProducedEnergyByFarm = useCallback(async () => {
    const { farmId } = query;
    if (!isReady) {
      return;
    }
    const response = await fetchProducedEnergyByFarmTrigger(Number(farmId));
    if (response.data) {
      setState(response.data);
    }
  }, [fetchProducedEnergyByFarmTrigger, isReady, query]);

  const fetchFarmById = useCallback(async () => {
    const { farmId } = query;
    if (!isReady) {
      return;
    }
    const response = await fetchFarmByIdTrigger(Number(farmId));
    if (response.data) {
      const {
        farmName,
        location: { latitude, longitude },
        pvPanel: { loss, peakPower },
      } = response.data;
      dispatch(
        setFarmConfiguration({
          farmName,
          location: { latitude, longitude },
          pvPanel: { loss, peakPower },
        })
      );
    }
  }, [dispatch, fetchFarmByIdTrigger, isReady, query]);

  useEffect(() => {
    fetchFarmById();
    fetchProducedEnergyByFarm();
  }, [fetchFarmById, fetchProducedEnergyByFarm]);

  return (
    <Grid sx={{ p: "4rem" }}>
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
            <OutputSolarFarm producedEnergy={state} />
          </Grid>
        </>
      )}
    </Grid>
  );
};
