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
import { EnergyType, ProducedEnergy } from "types/farmEnergy";
import { SolarFarmChart } from "./SolarFarmChart";
import { monthsLabels } from "common/constants";
import { FarmModelI } from "types";

function mapToPVEnergyProduction(data: EnergyType): number {
  return data.pVEnergyProductionKWH;
}

export const SingleSolarFarm = () => {
  const [state, setState] = useState<ProducedEnergy>({
    yearly: {
      inPlaneIrradiationKWM2: 0,
      pVEnergyProductionKWH: 0,
      variabilityKWH: 0,
    },
    monthly: [],
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

  const dispatchFarmConfiguration = useCallback(
    (farmConfiguration: FarmModelI) => {
      const {
        farmName,
        location: { latitude, longitude },
        pvPanel: { loss, peakPower },
      } = farmConfiguration;

      dispatch(
        setFarmConfiguration({
          farmName,
          location: { latitude, longitude },
          pvPanel: { loss, peakPower },
        })
      );
    },
    [dispatch]
  );

  const fetchFarmById = useCallback(async () => {
    const { farmId } = query;
    if (!isReady) {
      return;
    }
    const response = await fetchFarmByIdTrigger(Number(farmId));
    if (response.data) {
      dispatchFarmConfiguration(response.data);
    }
  }, [dispatchFarmConfiguration, fetchFarmByIdTrigger, isReady, query]);

  const monthlyData = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Monthly energy output from fix-angle PV system",
        data: state.monthly.map(mapToPVEnergyProduction),
        backgroundColor: "#FFB703",
      },
    ],
  };

  useEffect(() => {
    fetchFarmById();
    fetchProducedEnergyByFarm();
  }, [fetchFarmById, fetchProducedEnergyByFarm]);

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
            <OutputSolarFarm producedEnergy={state} />
          </Grid>
          <Grid
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <SolarFarmChart monthlyData={monthlyData} />
          </Grid>
        </>
      )}
    </Grid>
  );
};
