import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import {
  useLazyGetAllFarmsQuery,
  useLazyGetSummarizedFarmsResultsQuery,
} from "redux/api/v1/farm";
import { LoadingSpinner } from "common/components";

import SolarFarmIcon from "common/images/solarFarm.svg";
import EnergyBoltIcon from "common/images/energyBolt.svg";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";
import { FarmModelI } from "types";
import moment from "moment";
import { DDMMYY } from "common/constants";
import { DashboardFarmDetailsItem } from "./DashboardFarmDetailsItem";

const MapComponent = dynamic(
  () =>
    import("common/components/MapComponent/MapComponent").then(
      (item) => item.MapComponent
    ),
  { ssr: false, loading: () => <LoadingSpinner /> }
);

export const DashboardComponent = () => {
  const [allSolarFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [selectedSolarFarm, setSelectedSolarFarm] = useState<FarmModelI>();

  const [fetchSolarFarmsTrigger] = useLazyGetAllFarmsQuery();
  const [fetchSummarizedFarmsResultsTrigger, { data: summarizedData }] =
    useLazyGetSummarizedFarmsResultsQuery();

  const dateOfFirstCreatedSolarFarm = moment(allSolarFarms[0]?.created).format(
    DDMMYY
  );

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  const fetchSummarizedFarmsResults = useCallback(async () => {
    await fetchSummarizedFarmsResultsTrigger("");
  }, [fetchSummarizedFarmsResultsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
    fetchSummarizedFarmsResults();
  }, [fetchAllSolarFarms, fetchSummarizedFarmsResults]);

  const dashboardItems: DashboardItemProps[] = [
    {
      icon: SolarFarmIcon,
      title: "Number of farms you have started",
      value: summarizedData?.amountOfFarms ?? 0,
      subtitle: `since ${dateOfFirstCreatedSolarFarm}`,
    },
    {
      icon: EnergyBoltIcon,
      title: "Annual total PV production from all farms",
      value: summarizedData?.averagePVProduction ?? 0,
      subtitle: "from all your farms",
      unit: "kWh",
    },
  ];

  return (
    <Grid
      display="flex"
      flexDirection="column"
      sx={{ height: "100%", p: "4rem" }}
      gap={2}
    >
      <Typography variant="h3" fontWeight="600">
        Dashboard
      </Typography>
      <Grid display="flex" alignItems="center" gap={4}>
        {dashboardItems.map((item, index) => (
          <DashboardItem {...item} key={index} />
        ))}
      </Grid>
      <Grid height="50%">
        <MapComponent
          allSolarFarms={allSolarFarms}
          setSelectedSolarFarm={setSelectedSolarFarm}
        />
      </Grid>
      <DashboardFarmDetailsItem farmDetails={selectedSolarFarm} />
    </Grid>
  );
};
